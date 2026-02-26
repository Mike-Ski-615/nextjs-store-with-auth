import { TRPCError } from '@trpc/server';

import { createTRPCRouter } from '../init';
import { userProcedure } from '../middleware/ensure-user';
import { checkDocumentAccess } from '../middleware/document-access';
import {
  getDocumentByIdSchema,
  createDocumentSchema,
  updateDocumentSchema,
  deleteDocumentSchema,
} from '../schemas/documents';

export const documentsRouter = createTRPCRouter({
  /**
   * 列出用户可访问的所有文档
   */
  list: userProcedure
    .query(async ({ ctx }) => {
      const documents = await ctx.prisma.document.findMany({
        where: {
          collaborators: { some: { userId: ctx.userId } },
        },
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

      return {
        documents: documents.map(doc => ({
          ...doc,
          userRole: doc.collaborators.find(c => c.userId === ctx.userId)!.permission,
        })),
      };
    }),

  /**
   * 获取单个文档详情
   */
  getById: userProcedure
    .input(getDocumentByIdSchema)
    .query(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.findUnique({
        where: { id: input.id },
        include: {
          owner: {
            select: { id: true, name: true, email: true, image: true },
          },
          collaborators: {
            where: { NOT: { permission: 'OWNER' } },
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
        throw new TRPCError({ code: 'NOT_FOUND', message: '文档不存在' });
      }

      const isCollaborator = document.collaborators.some(c => c.userId === ctx.userId);
      if (document.ownerId !== ctx.userId && !isCollaborator) {
        throw new TRPCError({ code: 'FORBIDDEN', message: '无权访问此文档' });
      }

      return {
        document: {
          ...document,
          yjsState: document.yjsState ? Buffer.from(document.yjsState).toString('utf-8') : null,
        },
      };
    }),

  /**
   * 创建新文档
   */
  create: userProcedure
    .input(createDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.create({
        data: {
          filename: input.filename,
          description: input.description,
          ownerId: ctx.userId,
          yjsState: null,
          updateCount: 0,
          lastEditedBy: null,
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
   * 更新文档元数据（仅 OWNER / ADMIN）
   */
  update: userProcedure
    .input(updateDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const { isOwner, permission } = await checkDocumentAccess(ctx.prisma, ctx.userId, input.id);

      if (!isOwner && permission !== 'ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN', message: '只有所有者或管理员才能编辑文档信息' });
      }

      const data: { filename?: string; description?: string } = {};
      if (input.filename !== undefined) data.filename = input.filename;
      if (input.description !== undefined) data.description = input.description;

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
   * 删除文档（仅 OWNER）
   */
  delete: userProcedure
    .input(deleteDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      const { isOwner } = await checkDocumentAccess(ctx.prisma, ctx.userId, input.id);

      if (!isOwner) {
        throw new TRPCError({ code: 'FORBIDDEN', message: '只有文档所有者才能删除文档' });
      }

      await ctx.prisma.document.delete({ where: { id: input.id } });

      return { success: true };
    }),
});
