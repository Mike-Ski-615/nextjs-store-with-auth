// Tiptap Extensions - Modular Configuration
// 模块化的 Tiptap 扩展配置

import { listExtension } from "./list";
import { tableExtension } from "./table";
import { mediaExtensions } from "./media";
import { otherExtensions } from "./other";
import { textStyleExtensions } from "./text-style";
import { starterKitExtension } from "./starter-kit";

/**
 * 所有 Tiptap 扩展的集合
 * 
 * 模块分类：
 * - starter-kit: 基础编辑器功能（标题、段落、粗体、斜体等）
 * - table: 表格相关功能
 * - list: 列表相关功能（有序列表、无序列表、任务列表）
 * - text-style: 文本样式（对齐、高亮、上下标）
 * - media: 媒体相关（图片、数学公式）
 * - other: 其他扩展（字符计数等）
 */
export const tiptapExtensions = [
  starterKitExtension,
  tableExtension,
  listExtension,
  ...textStyleExtensions,
  ...mediaExtensions,
  ...otherExtensions,
];

// 导出各个模块，方便按需使用
export { starterKitExtension } from "./starter-kit";
export { tableExtension } from "./table";
export { listExtension } from "./list";
export { textStyleExtensions } from "./text-style";
export { mediaExtensions } from "./media";
export { otherExtensions } from "./other";
