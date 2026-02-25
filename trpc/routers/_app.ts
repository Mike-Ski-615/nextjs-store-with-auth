import { createTRPCRouter } from '../init';
import { documentsRouter } from './documents';

/**
 * 主 tRPC 路由器
 * 
 * 这里汇总所有子路由器
 * 
 * 身份验证说明：
 * - 用户身份验证在 proxy.ts 中间件完成（全局级别）
 * - tRPC 路由只负责操作权限验证（文档级别）
 * - 通过 ctx.userId 访问已认证的用户 ID
 */
export const appRouter = createTRPCRouter({
  // 文档管理路由
  docs: documentsRouter,
});

// 导出类型定义供客户端使用
export type AppRouter = typeof appRouter;