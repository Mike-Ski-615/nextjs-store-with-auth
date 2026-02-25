import * as Y from 'yjs';

import { prisma } from '@/lib/prisma';

/**
 * Initialize an empty Y.js document
 * @returns A new Y.Doc instance with empty state
 */
export function initializeEmptyYjsDocument(): Y.Doc {
  const doc = new Y.Doc();
  return doc;
}

/**
 * Load a Y.js document from the database
 * @param documentId - The ID of the document to load
 * @returns A Y.Doc instance with the loaded state, or a new empty document if no state exists
 * @throws Error if document is not found
 */
export async function loadYjsDocument(documentId: string): Promise<Y.Doc> {
  const doc = new Y.Doc();
  
  // Fetch the document from database
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    select: { yjsState: true }
  });
  
  if (!document) {
    throw new Error(`Document with id ${documentId} not found`);
  }
  
  // Apply the Y.js state if it exists
  if (document.yjsState) {
    const state = new Uint8Array(document.yjsState);
    Y.applyUpdate(doc, state);
  }
  
  return doc;
}

/**
 * Save a Y.js document to the database
 * @param documentId - The ID of the document to save
 * @param doc - The Y.Doc instance to save
 * @param userId - The ID of the user making the update (optional)
 * @returns The updated document
 * @throws Error if document is not found
 */
export async function saveYjsDocument(
  documentId: string,
  doc: Y.Doc,
  userId?: string
): Promise<void> {
  // Encode the Y.js state as a binary update
  const state = Y.encodeStateAsUpdate(doc);
  
  // Update the document in the database
  await prisma.document.update({
    where: { id: documentId },
    data: {
      yjsState: Buffer.from(state),
      updatedAt: new Date(),
      updateCount: { increment: 1 },
      ...(userId && { lastEditedBy: userId })
    }
  });
}

/**
 * Get the Y.js state as a Uint8Array from the database
 * @param documentId - The ID of the document
 * @returns The Y.js state as Uint8Array, or null if no state exists
 * @throws Error if document is not found
 */
export async function getYjsState(documentId: string): Promise<Uint8Array | null> {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    select: { yjsState: true }
  });
  
  if (!document) {
    throw new Error(`Document with id ${documentId} not found`);
  }
  
  if (!document.yjsState) {
    return null;
  }
  
  return new Uint8Array(document.yjsState);
}

/**
 * Apply a Y.js update to an existing document (incremental update)
 * This is more efficient than saving the entire state
 * @param documentId - The ID of the document
 * @param update - The Y.js update as Uint8Array
 * @param userId - The ID of the user making the update (optional)
 * @throws Error if document is not found
 */
export async function applyYjsUpdate(
  documentId: string,
  update: Uint8Array,
  userId?: string
): Promise<void> {
  // Load the current document
  const doc = await loadYjsDocument(documentId);
  
  // Apply the update
  Y.applyUpdate(doc, update);
  
  // Save the updated document
  await saveYjsDocument(documentId, doc, userId);
}

/**
 * Apply an incremental Y.js update directly to the database
 * This is more efficient as it doesn't require loading the entire document
 * @param documentId - The ID of the document
 * @param update - The Y.js incremental update as Uint8Array
 * @param userId - The ID of the user making the update (optional)
 * @throws Error if document is not found
 */
export async function applyIncrementalUpdate(
  documentId: string,
  update: Uint8Array,
  userId?: string
): Promise<void> {
  // Load current state
  const currentState = await getYjsState(documentId);
  
  // Create a temporary document to merge the update
  const doc = new Y.Doc();
  
  // Apply current state if it exists
  if (currentState) {
    Y.applyUpdate(doc, currentState);
  }
  
  // Apply the incremental update
  Y.applyUpdate(doc, update);
  
  // Encode the merged state
  const mergedState = Y.encodeStateAsUpdate(doc);
  
  // Update the document in the database
  await prisma.document.update({
    where: { id: documentId },
    data: {
      yjsState: Buffer.from(mergedState),
      updatedAt: new Date(),
      updateCount: { increment: 1 },
      ...(userId && { lastEditedBy: userId })
    }
  });
}
