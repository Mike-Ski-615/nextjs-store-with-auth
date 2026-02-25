import { TRPCError } from '@trpc/server';

import { middleware, baseProcedure } from '../init';

/**
 * 确保用户 ID 存在的中间件
 * 
 * 注意：这不是身份验证中间件（身份验证在 proxy.ts 完成）
 * 这只是确保 ctx.userId 存在，作为类型安全的保障
 */
const ensureUser = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User ID not found in context',
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId, // 现在 TypeScript 知道 userId 一定存在
    },
  });
});

/**
 * 带用户验证的 procedure
 * 使用此 procedure 可以确保 ctx.userId 存在
 */
export const userProcedure = baseProcedure.use(ensureUser);
