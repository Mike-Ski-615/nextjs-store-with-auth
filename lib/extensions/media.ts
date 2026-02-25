import Image from "@tiptap/extension-image";
import Math from "@tiptap/extension-mathematics";

/**
 * 媒体扩展配置
 * 
 * 包括：
 * - 图片插入和显示
 * - 数学公式（LaTeX）
 * 
 * 样式使用全局 CSS 变量，支持明暗主题切换
 */
export const mediaExtensions = [
  Image.configure({
    HTMLAttributes: {
      class: "max-w-full h-auto rounded-lg shadow-md m-2 border border-border",
    },
  }),
  Math,
];
