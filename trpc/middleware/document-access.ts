import { TRPCError } from '@trpc/server';

import { PermissionLevel } from '@/generated/prisma/enums';

/**
 * 文档访问权限检查工具
 * 
 * 注意：身份验证已在 proxy.ts 中间件完成，这里只验证操作权限
 * 确保用户对特定文档有相应的访问权限（所有者或协作者）
 */

/**
 * 检查文档访问权限
 * 返回文档信息和用户的权限级别
 * 
 * @param prisma - Prisma 客户端实例
 * @param userId - 当前用户 ID（来自 ctx.userId）
 * @param documentId - 文档 ID
 * @returns 文档信息、是否为所有者、权限级别
 * @throws NOT_FOUND - 文档不存在
 * @throws FORBIDDEN - 用户无权访问此文档
 */
export async function checkDocumentAccess(
  prisma: any,
  userId: string,
  documentId: string
) {
  // 获取文档及当前用户的协作者信息
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    select: {
      id: true,
      ownerId: true,
      filename: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      lastEditedBy: true,
      yjsState: true,
      updateCount: true,
      collaborators: {
        where: { userId: userId },
        select: {
          id: true,
          userId: true,
          permission: true,
          invitedAt: true,
        },
      },
    },
  });

  if (!document) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Document not found',
    });
  }

  // 检查是否为文档所有者
  const isOwner = document.ownerId === userId;
  
  // 获取协作者权限
  const collaborator = document.collaborators[0];
  const permission = collaborator?.permission as PermissionLevel | undefined;

  // 验证用户是否有权访问（必须是所有者或协作者）
  if (!isOwner && !collaborator) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have access to this document',
    });
  }

  return {
    document,
    isOwner,
    permission,
  };
}

/**
 * 检查用户是否有写入权限
 * 
 * @param isOwner - 是否为文档所有者
 * @param permission - 协作者权限级别
 * @returns 是否有写入权限
 */
export function hasWritePermission(
  isOwner: boolean,
  permission?: PermissionLevel
): boolean {
  return isOwner || permission === PermissionLevel.WRITE || permission === PermissionLevel.ADMIN;
}

/**
 * 检查用户是否有管理权限
 * 
 * @param isOwner - 是否为文档所有者
 * @param permission - 协作者权限级别
 * @returns 是否有管理权限
 */
export function hasAdminPermission(
  isOwner: boolean,
  permission?: PermissionLevel
): boolean {
  return isOwner || permission === PermissionLevel.ADMIN;
}
