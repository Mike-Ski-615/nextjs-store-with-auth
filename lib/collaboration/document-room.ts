import * as Y from 'yjs';
import { WebSocket } from 'ws';

export interface RoomClient {
  ws: WebSocket;
  userId: string;
  userName: string;
  userColor: string;
}

export interface UserInfo {
  userId: string;
  userName: string;
  userColor: string;
}

/**
 * Manages a collaborative document room with multiple clients
 */
export class DocumentRoom {
  private documentId: string;
  private doc: Y.Doc;
  private clients: Map<string, RoomClient> = new Map();

  constructor(documentId: string, doc: Y.Doc) {
    this.documentId = documentId;
    this.doc = doc;
  }

  /**
   * Add a client to the room
   */
  addClient(clientId: string, client: RoomClient): void {
    this.clients.set(clientId, client);
    console.log(`[Room ${this.documentId}] Client ${clientId} joined (${client.userName})`);
    
    // Broadcast user joined event
    this.broadcastUserJoined(client);
  }

  /**
   * Remove a client from the room
   */
  removeClient(clientId: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      this.clients.delete(clientId);
      console.log(`[Room ${this.documentId}] Client ${clientId} left (${client.userName})`);
      
      // Broadcast user left event
      this.broadcastUserLeft(client);
    }
  }

  /**
   * Get all active clients in the room
   */
  getActiveClients(): RoomClient[] {
    return Array.from(this.clients.values());
  }

  /**
   * Get active user information
   */
  getActiveUsers(): UserInfo[] {
    return this.getActiveClients().map(client => ({
      userId: client.userId,
      userName: client.userName,
      userColor: client.userColor,
    }));
  }

  /**
   * Get the number of active clients
   */
  getClientCount(): number {
    return this.clients.size;
  }

  /**
   * Get the Y.js document
   */
  getDocument(): Y.Doc {
    return this.doc;
  }

  /**
   * Check if the room is empty
   */
  isEmpty(): boolean {
    return this.clients.size === 0;
  }

  /**
   * Broadcast a message to all clients in the room
   */
  private broadcast(message: any, excludeClientId?: string): void {
    const messageStr = JSON.stringify(message);
    
    this.clients.forEach((client, clientId) => {
      // Skip excluded client
      if (excludeClientId && clientId === excludeClientId) {
        return;
      }

      // Only send to open connections
      if (client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(messageStr);
        } catch (error) {
          console.error(`[Room ${this.documentId}] Error sending to client ${clientId}:`, error);
        }
      }
    });
  }

  /**
   * Broadcast user joined event
   */
  private broadcastUserJoined(client: RoomClient): void {
    this.broadcast({
      type: 'user-joined',
      userId: client.userId,
      userName: client.userName,
      userColor: client.userColor,
      timestamp: Date.now(),
    });
  }

  /**
   * Broadcast user left event
   */
  private broadcastUserLeft(client: RoomClient): void {
    this.broadcast({
      type: 'user-left',
      userId: client.userId,
      timestamp: Date.now(),
    });
  }

  /**
   * Send active users list to a specific client
   */
  sendActiveUsers(clientId: string): void {
    const client = this.clients.get(clientId);
    if (!client || client.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const activeUsers = this.getActiveUsers();
    const message = JSON.stringify({
      type: 'active-users',
      users: activeUsers,
      timestamp: Date.now(),
    });

    try {
      client.ws.send(message);
    } catch (error) {
      console.error(`[Room ${this.documentId}] Error sending active users to ${clientId}:`, error);
    }
  }
}
