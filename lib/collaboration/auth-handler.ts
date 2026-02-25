import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export interface AuthResult {
  success: boolean;
  userId?: string;
  userName?: string;
  error?: string;
}

/**
 * Verify user authentication token
 * @param token - Authentication token
 * @returns Authentication result with user information
 */
export async function verifyAuthToken(token: string): Promise<AuthResult> {
  try {
    // Verify session token using Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: '无效或已过期的令牌',
      };
    }

    return {
      success: true,
      userId: session.user.id,
      userName: session.user.name,
    };
  } catch (error) {
    console.error('[Auth] 令牌验证错误:', error);
    return {
      success: false,
      error: '身份验证失败',
    };
  }
}

/**
 * Check if user has access to a document
 * @param userId - User ID
 * @param documentId - Document ID
 * @returns True if user has access, false otherwise
 */
export async function verifyDocumentAccess(
  userId: string,
  documentId: string
): Promise<boolean> {
  try {
    // Check if user is the owner
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { ownerId: true },
    });

    if (!document) {
      return false;
    }

    if (document.ownerId === userId) {
      return true;
    }

    // Check if user is a collaborator
    const collaborator = await prisma.collaborator.findUnique({
      where: {
        documentId_userId: {
          documentId,
          userId,
        },
      },
    });

    return !!collaborator;
  } catch (error) {
    console.error('[Auth] 文档访问验证错误:', error);
    return false;
  }
}

/**
 * Get user's permission level for a document
 * @param userId - User ID
 * @param documentId - Document ID
 * @returns Permission level or null if no access
 */
export async function getUserPermission(
  userId: string,
  documentId: string
): Promise<'READ' | 'WRITE' | 'ADMIN' | 'OWNER' | null> {
  try {
    // Check if user is the owner
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { ownerId: true },
    });

    if (!document) {
      return null;
    }

    if (document.ownerId === userId) {
      return 'OWNER';
    }

    // Check collaborator permission
    const collaborator = await prisma.collaborator.findUnique({
      where: {
        documentId_userId: {
          documentId,
          userId,
        },
      },
      select: { permission: true },
    });

    return collaborator ? collaborator.permission : null;
  } catch (error) {
    console.error('[Auth] Permission check error:', error);
    return null;
  }
}
