import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export interface WebSocketProviderOptions {
  documentId: string;
  yjsDoc: Y.Doc;
  token: string;
  onStatusChange?: (status: 'connected' | 'disconnected' | 'connecting') => void;
  onSynced?: (isSynced: boolean) => void;
}

/**
 * Create a WebSocket provider for real-time collaboration
 * @param options - Configuration options for the WebSocket provider
 * @returns WebsocketProvider instance
 */
export function createWebSocketProvider(
  options: WebSocketProviderOptions
): WebsocketProvider {
  const { documentId, yjsDoc, token, onStatusChange, onSynced } = options;

  // Get WebSocket URL from environment or use default
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/api/collaboration';

  // Create WebSocket provider
  const provider = new WebsocketProvider(
    wsUrl,
    documentId,
    yjsDoc,
    {
      params: { token },
      connect: true,
      // Reconnection settings
      maxBackoffTime: 5000, // Max 5 seconds between reconnection attempts
    }
  );

  // Monitor connection status
  provider.on('status', (event: { status: string }) => {
    console.log('[WebSocket] 状态:', event.status);
    
    if (onStatusChange) {
      const status = event.status as 'connected' | 'disconnected' | 'connecting';
      onStatusChange(status);
    }
  });

  // Monitor sync status
  provider.on('sync', (isSynced: boolean) => {
    console.log('[WebSocket] 已同步:', isSynced);
    
    if (onSynced) {
      onSynced(isSynced);
    }
  });

  // Monitor connection errors
  provider.on('connection-error', (error: Error) => {
    console.error('[WebSocket] 连接错误:', error);
  });

  // Monitor connection close
  provider.on('connection-close', (event: CloseEvent) => {
    console.log('[WebSocket] 连接已关闭:', event.code, event.reason);
  });

  return provider;
}

/**
 * Destroy a WebSocket provider and clean up resources
 * @param provider - The WebSocket provider to destroy
 */
export function destroyWebSocketProvider(provider: WebsocketProvider): void {
  try {
    provider.destroy();
    console.log('[WebSocket] Provider destroyed');
  } catch (error) {
    console.error('[WebSocket] Error destroying provider:', error);
  }
}
