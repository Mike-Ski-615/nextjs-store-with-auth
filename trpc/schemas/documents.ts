import { z } from 'zod';

export const createDocumentSchema = z.object({
  filename: z.string().min(1, '文档名称不能为空').max(255, '文档名称过长').trim(),
  description: z.string().max(1000, '描述过长').optional(),
});

export const getDocumentByIdSchema = z.object({
  id: z.string().min(1, '文档 ID 不能为空'),
});

export const updateDocumentSchema = z.object({
  id: z.string().min(1, '文档 ID 不能为空'),
  filename: z.string().min(1, '文档名称不能为空').max(255, '文档名称过长').trim().optional(),
  description: z.string().max(1000, '描述过长').optional(),
});

export const deleteDocumentSchema = z.object({
  id: z.string().min(1, '文档 ID 不能为空'),
});

// 类型导出
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
