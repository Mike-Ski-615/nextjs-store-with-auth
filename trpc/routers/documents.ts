/**
 * Documents tRPC Router
 * 
 * 这个路由器提供文档管理的所有 API 端点
 * 
 * 身份验证说明：
 * - 用户身份验证已在 proxy.ts 中间件完成
 * - userProcedure 确保 ctx.userId 存在
 * - 这里只需验证操作权限（是否有权访问/修改特定文档）
 */

import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter } from '../init';
import { userProcedure } from '../middleware/ensure-user';

export const documentsRouter = createTRPCRouter({
  /**
   * 列出文档
   * 
   * 功能：获取用户所有可访问的文档
   * 
   * 输入参数：无
   * 
   * 返回：
   * - documents: 文档列表，userRole 直接从 collaborators 表获取
   * 
   * 注意：owner 也作为 OWNER 权限的 collaborator 存储
   */
  list: userProcedure
    .query(async ({ ctx }) => {
      // 查询用户有权限访问的所有文档
      const documents = await ctx.prisma.document.findMany({
        where: {
          collaborators: {
            some: { userId: ctx.userId },
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          collaborators: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      // 添加当前用户的角色信息
      const documentsWithRole = documents.map(doc => {
        const userCollab = doc.collaborators.find(c => c.userId === ctx.userId)!;
        return {
          ...doc,
          userRole: userCollab.permission, // 简洁！直接使用
        };
      });

      return { documents: documentsWithRole };
    }),

  /**
   * 获取单个文档详情
   * 
   * 功能：获取文档的完整信息，包括协作者列表
   * 
   * 输入参数：
   * - id: string - 文档 ID
   * 
   * 返回：
   * - document: 文档详情（包含所有者、协作者、活动会话等）
   * 
   * 权限：验证是否为文档所有者或协作者
   */
  getById: userProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.findUnique({
        where: { id: input.id },
        include: {
          owner: {
            select: { id: true, name: true, email: true, image: true },
          },
          collaborators: {
            where: {
              // 排除 owner，前端已单独渲染 owner
              NOT: { permission: 'OWNER' },
            },
            include: {
              user: {
                select: { id: true, name: true, email: true, image: true },
              },
            },
          },
          activeSessions: {
            where: { isActive: true },
            include: {
              user: {
                select: { id: true, name: true, email: true, image: true },
              },
            },
          },
        },
      });

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '文档不存在',
        });
      }

      // 检查权限：必须是所有者或协作者
      const isCollaborator = document.collaborators.some(c => c.userId === ctx.userId);
      if (document.ownerId !== ctx.userId && !isCollaborator) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '无权访问此文档',
        });
      }

      return {
        document: {
          ...document,
          // Bytes → string，前端直接 JSON.parse
          yjsState: document.yjsState ? Buffer.from(document.yjsState).toString('utf-8') : null,
        },
      };
    }),

  /**
   * 创建新文档
   * 
   * 功能：创建一个新的空白文档
   * 
   * 输入参数：
   * - filename: string - 文档标题
   * - description?: string - 文档描述
   * 
   * 返回：
   * - document: 创建的文档信息
   */
  create: userProcedure
    .input(z.object({
      filename: z.string().min(1, '文档名称不能为空').max(255, '文档名称过长'),
      description: z.string().max(1000, '描述过长').optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // 创建文档并自动添加 owner 为 OWNER 权限的协作者
      const document = await ctx.prisma.document.create({
        data: {
          filename: input.filename,
          description: input.description,
          ownerId: ctx.userId,
          yjsState: null,
          updateCount: 0,
          lastEditedBy: null,
          // 自动创建 owner 的 collaborator 记录
          collaborators: {
            create: {
              userId: ctx.userId,
              permission: 'OWNER',
              invitedBy: ctx.userId,
            },
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          collaborators: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      return { document };
    }),

  /**
   * 更新文档元数据
   * 
   * 功能：更新文档的标题和描述
   * 
   * 输入参数：
   * - id: string - 文档 ID
   * - filename?: string - 新标题
   * - description?: string - 新描述
   * 
   * 返回：
   * - document: 更新后的文档信息
   * 
   * 权限：验证是否为文档所有者或管理员协作者
   */
  update: userProcedure
    .input(z.object({
      id: z.string(),
      filename: z.string().min(1, '文档名称不能为空').max(255, '文档名称过长').optional(),
      description: z.string().max(1000, '描述过长').optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // 1. 查询文档及当前用户的协作者权限
      const collaborator = await ctx.prisma.collaborator.findUnique({
        where: {
          documentId_userId: {
            documentId: input.id,
            userId: ctx.userId,
          },
        },
        select: { permission: true },
      });

      if (!collaborator) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '文档不存在或无权访问',
        });
      }

      // 2. 检查权限：仅 OWNER 或 ADMIN 可编辑元数据
      if (collaborator.permission !== 'OWNER' && collaborator.permission !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '只有所有者或管理员才能编辑文档信息',
        });
      }

      // 3. 构建更新数据
      const data: { filename?: string; description?: string } = {};
      if (input.filename !== undefined) data.filename = input.filename;
      if (input.description !== undefined) data.description = input.description;

      // 4. 更新文档
      const document = await ctx.prisma.document.update({
        where: { id: input.id },
        data,
        include: {
          owner: {
            select: { id: true, name: true, email: true, image: true },
          },
          collaborators: {
            include: {
              user: {
                select: { id: true, name: true, email: true, image: true },
              },
            },
          },
        },
      });

      return { document };
    }),

  /**
   * 删除文档
   * 
   * 功能：永久删除文档及其所有关联数据
   * 
   * 输入参数：
   * - id: string - 文档 ID
   * 
   * 返回：
   * - success: boolean
   * 
   * 权限：验证是否为文档所有者
   */
  delete: userProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // 1. 查询文档，验证存在性
      const document = await ctx.prisma.document.findUnique({
        where: { id: input.id },
        select: { ownerId: true },
      });

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '文档不存在',
        });
      }

      // 2. 检查权限：仅所有者可删除
      if (document.ownerId !== ctx.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '只有文档所有者才能删除文档',
        });
      }

      // 3. 删除文档（Collaborator、DocumentSnapshot、ActiveSession 均已配置 onDelete: Cascade，会自动级联删除）
      await ctx.prisma.document.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  /**
   * 添加协作者
   * 
   * 功能：邀请用户成为文档的协作者
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - userId?: string - 用户 ID（与 userEmail 二选一）
   * - userEmail?: string - 用户邮箱（与 userId 二选一）
   * - permission: 'READ' | 'WRITE' | 'ADMIN' - 权限级别
   * 
   * 返回：
   * - collaborator: 创建的协作者信息
   * 
   * 权限：验证是否为文档所有者或管理员协作者
   */
  addCollaborator: userProcedure
    .input(z.object({
      documentId: z.string(),
      userId: z.string().optional(),
      userEmail: z.string().email().optional(),
      permission: z.enum(['READ', 'WRITE', 'ADMIN']),
    }).refine(data => data.userId || data.userEmail, {
      message: 'Either userId or userEmail must be provided',
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现添加协作者
      // 1. 检查权限（所有者或 ADMIN 协作者）
      // 2. 根据 userId 或 userEmail 查找用户
      // 3. 验证用户不是文档所有者
      // 4. 验证用户不是已有协作者
      // 5. 创建协作者记录
      // 6. 返回协作者信息
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 更新协作者权限
   * 
   * 功能：修改协作者的权限级别
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - collaboratorId: string - 协作者 ID
   * - permission: 'READ' | 'WRITE' | 'ADMIN' - 新权限级别
   * 
   * 返回：
   * - collaborator: 更新后的协作者信息
   * 
   * 权限：验证是否为文档所有者或管理员协作者
   */
  updateCollaborator: userProcedure
    .input(z.object({
      documentId: z.string(),
      collaboratorId: z.string(),
      permission: z.enum(['READ', 'WRITE', 'ADMIN']),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现更新协作者权限
      // 1. 检查权限（所有者或 ADMIN 协作者）
      // 2. 更新协作者权限
      // 3. 返回更新后的协作者信息
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 移除协作者
   * 
   * 功能：从文档中移除协作者
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - collaboratorId: string - 协作者 ID
   * 
   * 返回：
   * - success: boolean
   * 
   * 权限：验证是否为文档所有者或管理员协作者
   */
  removeCollaborator: userProcedure
    .input(z.object({
      documentId: z.string(),
      collaboratorId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现移除协作者
      // 1. 检查权限（所有者或 ADMIN 协作者）
      // 2. 验证不能移除文档所有者
      // 3. 删除协作者记录
      // 4. 返回成功状态
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 保存文档内容
   * 
   * 功能：将编辑器 JSON 内容持久化到数据库
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - content: string - JSON 字符串（editor.getJSON() 序列化后）
   * 
   * 返回：
   * - success: boolean
   * 
   * 权限：所有者或 WRITE/ADMIN 协作者
   */
  saveContent: userProcedure
    .input(z.object({
      documentId: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // 1. 查询权限
      const collaborator = await ctx.prisma.collaborator.findUnique({
        where: {
          documentId_userId: {
            documentId: input.documentId,
            userId: ctx.userId,
          },
        },
        select: { permission: true },
      });

      if (!collaborator) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '文档不存在或无权访问',
        });
      }

      if (collaborator.permission === 'READ') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '只读用户无法保存文档',
        });
      }

      // 2. 持久化：string → Buffer → Bytes
      await ctx.prisma.document.update({
        where: { id: input.documentId },
        data: {
          yjsState: Buffer.from(input.content, 'utf-8'),
          lastEditedBy: ctx.userId,
          updateCount: { increment: 1 },
        },
      });

      return { success: true };
    }),

  /**
   * 获取 Y.js 文档状态
   * 
   * 功能：获取文档的 Y.js CRDT 状态，用于协作编辑
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * 
   * 返回：
   * - yjsState: Buffer | null - Y.js 状态数据
   * 
   * 权限：验证是否为文档所有者或协作者
   */
  getYjsState: userProcedure
    .input(z.object({
      documentId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      // TODO: 实现获取 Y.js 状态
      // 1. 检查权限（所有者或协作者）
      // 2. 获取文档的 yjsState 字段
      // 3. 返回状态数据
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 更新 Y.js 文档状态
   * 
   * 功能：保存文档的 Y.js CRDT 状态
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - state: Buffer - Y.js 状态数据
   * 
   * 返回：
   * - success: boolean
   * 
   * 权限：验证是否为文档所有者或有写入权限的协作者
   */
  updateYjsState: userProcedure
    .input(z.object({
      documentId: z.string(),
      state: z.instanceof(Buffer),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现更新 Y.js 状态
      // 1. 检查权限（所有者或 WRITE/ADMIN 协作者）
      // 2. 更新文档的 yjsState 字段
      // 3. 更新 updateCount 和 lastEditedBy
      // 4. 返回成功状态
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 创建文档快照
   * 
   * 功能：保存文档的当前状态作为快照，用于版本历史
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - description?: string - 快照描述
   * 
   * 返回：
   * - snapshot: 创建的快照信息
   * 
   * 权限：验证是否为文档所有者或有写入权限的协作者
   */
  createSnapshot: userProcedure
    .input(z.object({
      documentId: z.string(),
      description: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现创建快照
      // 1. 检查权限（所有者或 WRITE/ADMIN 协作者）
      // 2. 获取当前文档的 yjsState
      // 3. 创建快照记录
      // 4. 返回快照信息
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 列出文档快照
   * 
   * 功能：获取文档的所有快照列表
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * 
   * 返回：
   * - snapshots: 快照列表
   * 
   * 权限：验证是否为文档所有者或协作者
   */
  listSnapshots: userProcedure
    .input(z.object({
      documentId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      // TODO: 实现列出快照
      // 1. 检查权限（所有者或协作者）
      // 2. 查询文档的所有快照
      // 3. 按创建时间倒序排列
      // 4. 返回快照列表
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 恢复文档快照
   * 
   * 功能：将文档恢复到指定快照的状态
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - snapshotId: string - 快照 ID
   * 
   * 返回：
   * - success: boolean
   * 
   * 权限：验证是否为文档所有者或有写入权限的协作者
   */
  restoreSnapshot: userProcedure
    .input(z.object({
      documentId: z.string(),
      snapshotId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现恢复快照
      // 1. 检查权限（所有者或 WRITE/ADMIN 协作者）
      // 2. 获取快照的 yjsState
      // 3. 更新文档的 yjsState 为快照状态
      // 4. 返回成功状态
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 创建编辑会话
   * 
   * 功能：记录用户开始编辑文档
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * 
   * 返回：
   * - session: 创建的会话信息
   * 
   * 权限：验证是否为文档所有者或协作者
   */
  createSession: userProcedure
    .input(z.object({
      documentId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现创建会话
      // 1. 检查权限（所有者或协作者）
      // 2. 创建或更新活动会话记录
      // 3. 返回会话信息
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 列出活动会话
   * 
   * 功能：获取文档的所有活动编辑会话
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * 
   * 返回：
   * - sessions: 活动会话列表
   * 
   * 权限：验证是否为文档所有者或协作者
   */
  listSessions: userProcedure
    .input(z.object({
      documentId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      // TODO: 实现列出会话
      // 1. 检查权限（所有者或协作者）
      // 2. 查询活动会话（isActive = true）
      // 3. 返回会话列表
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),

  /**
   * 结束编辑会话
   * 
   * 功能：标记用户结束编辑文档
   * 
   * 输入参数：
   * - documentId: string - 文档 ID
   * - sessionId: string - 会话 ID
   * 
   * 返回：
   * - success: boolean
   * 
   * 权限：验证是否为会话所有者
   */
  endSession: userProcedure
    .input(z.object({
      documentId: z.string(),
      sessionId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: 实现结束会话
      // 1. 检查权限（会话所有者）
      // 2. 更新会话状态为 inactive
      // 3. 返回成功状态
      
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
        message: 'This endpoint is not implemented yet',
      });
    }),
});
