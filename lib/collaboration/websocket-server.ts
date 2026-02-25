import * as Y from 'yjs';
import { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

import { generateUserColor } from '@/lib/utils/user-color';
import { loadYjsDocument, saveYjsDocument } from '@/lib/yjs/document';

import { DocumentRoom } from './document-room';
import { verifyAuthToken, verifyDocumentAccess } from './auth-handler';

/**
 * WebSocket collaboration server for real-time document editing
 */
export class CollaborationServer {
  private wss: WebSocketServer;
  private rooms: Map<string, DocumentRoom> = new Map();
  private clientRooms: Map<WebSocket, string> = new Map();
  private saveTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(server: any) {
    this.wss = new WebSocketServer({ 
      server,
      path: '/api/collaboration',
    });

    this.wss.on('connection', this.handleConnection.bind(this));
    
    console.log('[WebSocket 服务器] 已启动');
  }

  /**
   * Handle new WebSocket connection
   */
  private async handleConnection(ws: WebSocket, req: IncomingMessage): Promise<void> {
    console.log('[WebSocket] 新连接尝试');

    try {
      // Parse URL parameters
      const url = new URL(req.url || '', 'http://localhost');
      const documentId = url.searchParams.get('documentId');
      const token = url.searchParams.get('token');

      // Validate parameters
      if (!documentId || !token) {
        console.error('[WebSocket] 缺少 documentId 或 token');
        ws.close(1008, '缺少 documentId 或 token');
        return;
      }

      // Verify authentication
      const authResult = await verifyAuthToken(token);
      if (!authResult.success || !authResult.userId || !authResult.userName) {
        console.error('[WebSocket] 认证失败:', authResult.error);
        ws.close(1008, '未授权');
        return;
      }

      const { userId, userName } = authResult;

      // Verify document access
      const hasAccess = await verifyDocumentAccess(userId, documentId);
      if (!hasAccess) {
        console.error('[WebSocket] User does not have access to document');
        ws.close(1008, 'Access denied');
        return;
      }

      // Get or create document room
      let room = this.rooms.get(documentId);
      if (!room) {
        const doc = await loadYjsDocument(documentId);
        room = new DocumentRoom(documentId, doc);
        this.rooms.set(documentId, room);
        
        // Setup auto-save for this document
        this.setupAutoSave(documentId, doc);
      }

      // Generate client ID and user color
      const clientId = `${userId}-${Date.now()}`;
      const userColor = generateUserColor(userId);

      // Add client to room
      room.addClient(clientId, {
        ws,
        userId,
        userName,
        userColor,
      });

      // Track which room this client is in
      this.clientRooms.set(ws, documentId);

      // Send active users to the new client
      room.sendActiveUsers(clientId);

      // Setup Y.js sync
      this.setupYjsSync(ws, room.getDocument(), documentId);

      // Handle client disconnect
      ws.on('close', () => {
        this.handleDisconnect(ws, documentId, clientId);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('[WebSocket] Client error:', error);
      });

      console.log(`[WebSocket] Client ${clientId} connected to document ${documentId}`);
    } catch (error) {
      console.error('[WebSocket] Connection error:', error);
      ws.close(1011, 'Internal server error');
    }
  }

  /**
   * Setup Y.js synchronization for a client
   */
  private setupYjsSync(ws: WebSocket, doc: Y.Doc, documentId: string): void {
    // Send initial document state
    const state = Y.encodeStateAsUpdate(doc);
    ws.send(JSON.stringify({
      type: 'sync-step-1',
      state: Array.from(state),
    }));

    // Listen for Y.js updates from client
    ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'sync-update') {
          // Apply update to document
          const update = new Uint8Array(message.update);
          Y.applyUpdate(doc, update);
          
          // Broadcast update to other clients
          this.broadcastUpdate(documentId, update, ws);
          
          // Trigger auto-save
          this.triggerAutoSave(documentId);
        }
      } catch (error) {
        console.error('[WebSocket] Message handling error:', error);
      }
    });

    // Listen for document updates
    const updateHandler = (update: Uint8Array, origin: any) => {
      // Don't send updates back to the origin
      if (origin === ws) return;

      // Send update to client
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'sync-update',
          update: Array.from(update),
        }));
      }
    };

    doc.on('update', updateHandler);

    // Cleanup on disconnect
    ws.on('close', () => {
      doc.off('update', updateHandler);
    });
  }

  /**
   * Broadcast Y.js update to all clients in a room except the sender
   */
  private broadcastUpdate(documentId: string, update: Uint8Array, sender: WebSocket): void {
    const room = this.rooms.get(documentId);
    if (!room) return;

    const clients = room.getActiveClients();
    const message = JSON.stringify({
      type: 'sync-update',
      update: Array.from(update),
    });

    clients.forEach(client => {
      if (client.ws !== sender && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(message);
      }
    });
  }

  /**
   * Handle client disconnect
   */
  private handleDisconnect(ws: WebSocket, documentId: string, clientId: string): void {
    console.log(`[WebSocket] Client ${clientId} disconnected`);

    const room = this.rooms.get(documentId);
    if (room) {
      room.removeClient(clientId);

      // If room is empty, clean it up after a delay
      if (room.isEmpty()) {
        setTimeout(() => {
          if (room.isEmpty()) {
            this.cleanupRoom(documentId);
          }
        }, 60000); // 1 minute delay
      }
    }

    this.clientRooms.delete(ws);
  }

  /**
   * Setup auto-save for a document
   */
  private setupAutoSave(documentId: string, doc: Y.Doc): void {
    doc.on('update', () => {
      this.triggerAutoSave(documentId);
    });
  }

  /**
   * Trigger auto-save with debouncing
   */
  private triggerAutoSave(documentId: string): void {
    // Clear existing timer
    const existingTimer = this.saveTimers.get(documentId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = setTimeout(async () => {
      await this.saveDocument(documentId);
      this.saveTimers.delete(documentId);
    }, 5000); // Save after 5 seconds of inactivity

    this.saveTimers.set(documentId, timer);
  }

  /**
   * Save document to database
   */
  private async saveDocument(documentId: string): Promise<void> {
    const room = this.rooms.get(documentId);
    if (!room) return;

    try {
      const doc = room.getDocument();
      await saveYjsDocument(documentId, doc);
      console.log(`[WebSocket] Document ${documentId} saved to database`);
    } catch (error) {
      console.error(`[WebSocket] Error saving document ${documentId}:`, error);
    }
  }

  /**
   * Cleanup a room and save final state
   */
  private async cleanupRoom(documentId: string): Promise<void> {
    console.log(`[WebSocket] Cleaning up room ${documentId}`);

    // Save final state
    await this.saveDocument(documentId);

    // Clear save timer
    const timer = this.saveTimers.get(documentId);
    if (timer) {
      clearTimeout(timer);
      this.saveTimers.delete(documentId);
    }

    // Remove room
    this.rooms.delete(documentId);
  }

  /**
   * Get server statistics
   */
  getStats() {
    return {
      activeRooms: this.rooms.size,
      totalClients: Array.from(this.rooms.values()).reduce(
        (sum, room) => sum + room.getClientCount(),
        0
      ),
    };
  }
}
