// Other Extensions
// 其他扩展配置

import { Placeholder, CharacterCount } from '@tiptap/extensions'

/**
 * 其他扩展配置
 * 
 * 包括：
 * - 字符计数：统计编辑器中的字符数和单词数
 * - 占位符：在编辑器为空时显示提示文本
 * - 焦点样式：为获得焦点的节点添加样式
 */
export const otherExtensions = [
  CharacterCount,
  Placeholder.configure({
    placeholder: "请开始输入内容...",
    emptyEditorClass: "before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:pointer-events-none before:h-0"
  }),
];
