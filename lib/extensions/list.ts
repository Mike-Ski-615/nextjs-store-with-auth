import { ListKit } from "@tiptap/extension-list";

/**
 * ListKit 配置
 * 
 * 提供增强的列表功能，包括：
 * - 有序列表和无序列表
 * - 任务列表（待办事项）
 * - 嵌套列表支持
 * 
 * 样式使用全局 CSS 变量，支持明暗主题切换
 */
export const listExtension = ListKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: "list-disc list-outside ml-4 my-4 space-y-2",
    },
  },
  listItem: {
    HTMLAttributes: {
      class: "leading-relaxed text-foreground",
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: "list-decimal list-outside ml-6 my-4 space-y-2",
    },
  },
  taskList: {
    HTMLAttributes: {
      class: "list-none my-4 space-y-2",
    },
  },
  taskItem: {
    nested: true,
    HTMLAttributes: {
      class: "flex items-center gap-2",
    },
  },
});
