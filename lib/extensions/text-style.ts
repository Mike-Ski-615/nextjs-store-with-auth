import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import { TextStyleKit } from "@tiptap/extension-text-style";

/**
 * 文本样式扩展配置
 * 
 * 包括：
 * - 文本颜色和背景色
 * - 文本对齐（左、中、右、两端对齐）
 * - 高亮标记
 * - 上标和下标
 * 
 * 样式使用全局 CSS 变量，支持明暗主题切换
 */
export const textStyleExtensions = [
  TextStyleKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: "px-1 rounded bg-accent/30",
    },
  }),
  Subscript.configure({
    HTMLAttributes: {
      class: "text-sm align-sub text-muted-foreground",
    },
  }),
  Superscript.configure({
    HTMLAttributes: {
      class: "text-sm align-super text-muted-foreground",
    },
  }),
];
