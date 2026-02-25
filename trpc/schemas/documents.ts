import { z } from 'zod';

/**
 * Zod validation schemas for Documents tRPC router
 * These schemas validate all input to tRPC procedures
 */

// ============================================================================
// Document Schemas
// ============================================================================

/**
 * Schema for creating a new document
 * Requirements: 1.3, 9.1
 */
export const createDocumentSchema = z.object({
  filename: z.string().min(1, 'Filename is required').trim(),
  description: z.string().optional(),
});

/**
 * Schema for listing documents with filtering, sorting, and pagination
 * Requirements: 1.3, 9.1
 */
export const listDocumentsSchema = z.object({
  type: z.enum(['owned', 'shared', 'all']).optional().default('all'),
  sort: z.enum(['updatedAt', 'createdAt', 'filename']).optional().default('updatedAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

/**
 * Schema for updating document metadata
 * Requirements: 1.3, 9.1
 */
export const updateDocumentSchema = z.object({
  id: z.string().min(1, 'Document ID is required'),
  filename: z.string().min(1, 'Filename cannot be empty').trim().optional(),
  description: z.string().optional(),
});

/**
 * Schema for getting a document by ID
 * Requirements: 1.3, 9.1
 */
export const getDocumentByIdSchema = z.object({
  id: z.string().min(1, 'Document ID is required'),
});

/**
 * Schema for deleting a document
 * Requirements: 1.3, 9.1
 */
export const deleteDocumentSchema = z.object({
  id: z.string().min(1, 'Document ID is required'),
});

// ============================================================================
// Collaborator Schemas
// ============================================================================

/**
 * Schema for adding a collaborator to a document
 * Supports adding by userId or userEmail
 * Requirements: 1.3, 9.1
 */
export const addCollaboratorSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  userId: z.string().optional(),
  userEmail: z.string().email('Invalid email format').optional(),
  permission: z.enum(['READ', 'WRITE', 'ADMIN'], {
    message: 'Permission must be READ, WRITE, or ADMIN',
  }),
}).refine(
  (data) => data.userId || data.userEmail,
  { 
    message: 'Either userId or userEmail must be provided',
    path: ['userId'],
  }
);

/**
 * Schema for updating a collaborator's permission
 * Requirements: 1.3, 9.1
 */
export const updateCollaboratorSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  collaboratorId: z.string().min(1, 'Collaborator ID is required'),
  permission: z.enum(['READ', 'WRITE', 'ADMIN'], {
    message: 'Permission must be READ, WRITE, or ADMIN',
  }),
});

/**
 * Schema for removing a collaborator from a document
 * Requirements: 1.3, 9.1
 */
export const removeCollaboratorSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  collaboratorId: z.string().min(1, 'Collaborator ID is required'),
});

/**
 * Schema for listing collaborators of a document
 * Requirements: 1.3, 9.1
 */
export const listCollaboratorsSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
});

// ============================================================================
// Session Schemas
// ============================================================================

/**
 * Schema for creating an active session
 * Requirements: 1.3, 9.1
 */
export const createSessionSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
});

/**
 * Schema for listing active sessions
 * Requirements: 1.3, 9.1
 */
export const listSessionsSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
});

/**
 * Schema for ending an active session
 * Requirements: 1.3, 9.1
 */
export const endSessionSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  sessionId: z.string().min(1, 'Session ID is required'),
});

/**
 * Schema for updating session activity
 * Requirements: 1.3, 9.1
 */
export const updateSessionActivitySchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  sessionId: z.string().min(1, 'Session ID is required'),
});

// ============================================================================
// Snapshot Schemas
// ============================================================================

/**
 * Schema for creating a document snapshot
 * Requirements: 1.3, 9.1
 */
export const createSnapshotSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  description: z.string().optional().nullable(),
});

/**
 * Schema for listing document snapshots
 * Requirements: 1.3, 9.1
 */
export const listSnapshotsSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

/**
 * Schema for restoring a document snapshot
 * Requirements: 1.3, 9.1
 */
export const restoreSnapshotSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  snapshotId: z.string().min(1, 'Snapshot ID is required'),
});

/**
 * Schema for getting a specific snapshot
 * Requirements: 1.3, 9.1
 */
export const getSnapshotSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  snapshotId: z.string().min(1, 'Snapshot ID is required'),
});

/**
 * Schema for deleting a snapshot
 * Requirements: 1.3, 9.1
 */
export const deleteSnapshotSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  snapshotId: z.string().min(1, 'Snapshot ID is required'),
});

// ============================================================================
// Y.js State Schemas
// ============================================================================

/**
 * Schema for getting Y.js state
 * Requirements: 1.3, 9.1
 */
export const getYjsStateSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
});

/**
 * Schema for updating Y.js state
 * Requirements: 1.3, 9.1
 */
export const updateYjsStateSchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  state: z.instanceof(Uint8Array, { message: 'State must be a Uint8Array' })
    .or(z.instanceof(Buffer, { message: 'State must be a Buffer' })),
});

// ============================================================================
// Type Exports
// ============================================================================

// Export inferred types for use in procedures
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type ListDocumentsInput = z.infer<typeof listDocumentsSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type GetDocumentByIdInput = z.infer<typeof getDocumentByIdSchema>;
export type DeleteDocumentInput = z.infer<typeof deleteDocumentSchema>;

export type AddCollaboratorInput = z.infer<typeof addCollaboratorSchema>;
export type UpdateCollaboratorInput = z.infer<typeof updateCollaboratorSchema>;
export type RemoveCollaboratorInput = z.infer<typeof removeCollaboratorSchema>;
export type ListCollaboratorsInput = z.infer<typeof listCollaboratorsSchema>;

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type ListSessionsInput = z.infer<typeof listSessionsSchema>;
export type EndSessionInput = z.infer<typeof endSessionSchema>;
export type UpdateSessionActivityInput = z.infer<typeof updateSessionActivitySchema>;

export type CreateSnapshotInput = z.infer<typeof createSnapshotSchema>;
export type ListSnapshotsInput = z.infer<typeof listSnapshotsSchema>;
export type RestoreSnapshotInput = z.infer<typeof restoreSnapshotSchema>;
export type GetSnapshotInput = z.infer<typeof getSnapshotSchema>;
export type DeleteSnapshotInput = z.infer<typeof deleteSnapshotSchema>;

export type GetYjsStateInput = z.infer<typeof getYjsStateSchema>;
export type UpdateYjsStateInput = z.infer<typeof updateYjsStateSchema>;
