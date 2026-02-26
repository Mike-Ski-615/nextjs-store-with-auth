import StarterKit from "@tiptap/starter-kit";

/**
 * StarterKit 配置
 * 
 * 注意：禁用了列表相关的扩展（bulletList、orderedList、listItem、listKeymap）
 * 因为我们使用 ListKit 来提供更强大的列表功能
 * 
 * 样式使用全局 CSS 变量，支持明暗主题切换
 */
export const starterKitExtension = StarterKit.configure({
  // 禁用 StarterKit 中的列表扩展，使用 ListKit 代替
  bulletList: false,
  orderedList: false,
  listItem: false,
  listKeymap: false,
  
  blockquote: {
    HTMLAttributes: {
      class:
        "border-l-4 border-border pl-4 py-2 my-4 italic text-muted-foreground bg-muted/50 rounded-r",
    },
  },
  bold: {
    HTMLAttributes: {
      class: "font-bold text-foreground",
    },
  },
  code: {
    HTMLAttributes: {
      class:
        "bg-muted text-accent-foreground px-1.5 py-0.5 rounded text-sm font-mono",
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class:
        "bg-code text-code-foreground p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto border border-border",
    },
  },
  dropcursor: {
    color: "hsl(var(--primary))",
    width: 2,
  },
  gapcursor: false,
  hardBreak: {
    HTMLAttributes: {
      class: "block",
    },
  },
  heading: {
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class:
        "font-bold text-foreground mt-6 mb-4 first:mt-0",
    },
  },
  // 禁用 StarterKit 的 undoRedo，由 Liveblocks 协作扩展接管
  undoRedo: false,
  horizontalRule: {
    HTMLAttributes: {
      class: "border-0 border-t-2 border-border my-8",
    },
  },
  italic: {
    HTMLAttributes: {
      class: "italic text-foreground",
    },
  },
  link: {
    HTMLAttributes: {
      class:
        "text-blue-500 underline hover:text-blue-700 transition-colors cursor-pointer",
      rel: "noopener noreferrer",
      target: "_blank",
    },
  },
  paragraph: {
    HTMLAttributes: {
      class: "leading-7 text-foreground",
    },
  },
  strike: {
    HTMLAttributes: {
      class: "line-through text-muted-foreground",
    },
  },
  underline: {
    HTMLAttributes: {
      class: "underline decoration-2 underline-offset-2",
    },
  },
  trailingNode: false,
});
