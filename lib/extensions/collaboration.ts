// Collaboration Extensions
// 协作相关扩展

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

/**
 * Create collaboration extension with Y.js document
 * @param yjsDoc - Y.js document instance
 * @returns Collaboration extension
 */
export function createCollaborationExtension(yjsDoc: Y.Doc) {
  return Collaboration.configure({
    document: yjsDoc,
  });
}

/**
 * Create collaboration cursor extension with WebSocket provider
 * @param provider - WebSocket provider instance
 * @param user - User information (name and color)
 * @returns CollaborationCursor extension
 */
export function createCollaborationCursorExtension(
  provider: WebsocketProvider | null,
  user: { name: string; color: string }
) {
  if (!provider) {
    // Return a disabled cursor extension if no provider
    return CollaborationCursor.configure({
      provider: null as any,
      user,
    });
  }

  return CollaborationCursor.configure({
    provider,
    user,
  });
}

/**
 * Get base extensions without collaboration
 * Use this for non-collaborative editing
 */
export { tiptapExtensions as baseExtensions } from './index';
