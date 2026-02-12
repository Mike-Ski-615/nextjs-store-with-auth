/**
 * Tiptap 编辑器扩展配置
 * 集中管理所有编辑器扩展的配置，实现模块化设计
 */

import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Mathematics from "@tiptap/extension-mathematics";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { CellAlign } from "../components/editor/extensions/cell-align";
import { TableKit } from "@tiptap/extension-table";
import type { Editor } from "@tiptap/react";

/**
 * 获取 Tiptap 编辑器的所有扩展配置
 * @param editor - 编辑器实例，用于某些扩展的交互功能
 * @returns 配置好的扩展数组
 */
export const getTiptapExtensions = (editor?: Editor | null) => [
  /**
   * StarterKit - 基础扩展包
   * 包含了常用的基础功能：段落、标题、粗体、斜体、删除线、代码、代码块、引用、水平线、换行、列表、下划线、链接、间隙光标等
   */
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6], // 支持的标题级别：h1 到 h6
    },
    link: {
      openOnClick: false, // 点击链接时不自动打开，避免编辑时误触
      autolink: true, // 自动检测并转换 URL 为链接
      linkOnPaste: true, // 粘贴 URL 时自动创建链接
      HTMLAttributes: {
        class: "!text-blue-500 !underline !cursor-pointer", // 链接的样式类名：蓝色、下划线、指针光标
      },
    },
  }),

  /**
   * Highlight - 文本高亮扩展
   * 允许用户为文本添加高亮背景色
   */
  Highlight.configure({
    multicolor: true, // 启用多颜色高亮支持，允许使用不同颜色的高亮
  }),

  /**
   * TextStyle - 文本样式扩展
   * 为文本添加内联样式支持，是 Color 等扩展的基础
   */
  TextStyle,

  /**
   * Color - 文本颜色扩展
   * 允许用户更改文本颜色
   * 依赖 TextStyle 扩展
   */
  Color,

  /**
   * TextAlign - 文本对齐扩展
   * 支持左对齐、居中、右对齐、两端对齐
   */
  TextAlign.configure({
    types: ["heading", "paragraph"], // 指定哪些节点类型支持文本对齐：标题和段落
  }),

  /**
   * Subscript - 下标扩展
   * 将文本显示为下标，如化学式 H₂O
   * 快捷键：Ctrl/Cmd + ,
   */
  Subscript,

  /**
   * Superscript - 上标扩展
   * 将文本显示为上标，如数学式 x²
   * 快捷键：Ctrl/Cmd + .
   */
  Superscript,

  /**
   * TaskList - 任务列表扩展
   * 创建可勾选的任务列表
   */
  TaskList.configure({
    HTMLAttributes: {
      class: "list-none pl-0",
    },
  }),

  /**
   * TaskItem - 任务项扩展
   * 任务列表中的单个任务项
   */
  TaskItem.configure({
    nested: true, // 允许任务项嵌套，支持创建子任务
    HTMLAttributes: {
      class: "flex gap-2 mb-2",
    },
  }),

  /**
   * Image - 图片扩展
   * 支持插入和显示图片
   */
  Image.configure({
    inline: true, // 允许图片作为内联元素显示
    allowBase64: true, // 允许使用 Base64 编码的图片
    HTMLAttributes: {
      class: "max-w-full h-auto rounded", // 图片样式：最大宽度100%、高度自适应、圆角
    },
  }),

  /**
   * Mathematics - 数学公式扩展
   * 支持 LaTeX 数学公式的渲染和编辑
   * 使用 KaTeX 进行公式渲染
   */
  Mathematics.configure({
    // 行内公式配置
    inlineOptions: {
      /**
       * 点击行内公式时的处理函数
       * @param node - 当前公式节点
       * @param pos - 节点在文档中的位置
       */
      onClick: (node, pos) => {
        const katex = prompt('输入 LaTeX 公式:', node.attrs.latex);
        if (katex) {
          // 更新公式内容
          editor?.chain().setNodeSelection(pos).updateInlineMath({ latex: katex }).focus().run();
        }
      },
    },
    // 块级公式配置
    blockOptions: {
      /**
       * 点击块级公式时的处理函数
       * @param node - 当前公式节点
       * @param pos - 节点在文档中的位置
       */
      onClick: (node, pos) => {
        const katex = prompt('输入 LaTeX 公式:', node.attrs.latex);
        if (katex) {
          // 更新公式内容
          editor?.chain().setNodeSelection(pos).updateBlockMath({ latex: katex }).focus().run();
        }
      },
    },
    // KaTeX 渲染选项
    katexOptions: {
      throwOnError: false, // 公式错误时不抛出异常，而是显示错误信息
    },
  }),

  /**
   * CellAlign - 表格单元格对齐扩展
   * 自定义扩展，用于设置表格单元格的对齐方式
   */
  CellAlign,

  /**
   * TableKit - 表格扩展套件
   * 提供完整的表格功能：创建、编辑、调整大小等
   * 
   * TableKit 包含以下子扩展：
   * 1. Table - 表格容器节点
   * 2. TableRow - 表格行节点
   * 3. TableHeader - 表格表头单元格节点
   * 4. TableCell - 表格普通单元格节点
   * 
   * 支持的功能：
   * - insertTable() - 插入新表格
   * - addColumnBefore() - 在当前列之前添加列
   * - addColumnAfter() - 在当前列之后添加列
   * - deleteColumn() - 删除当前列
   * - addRowBefore() - 在当前行之前添加行
   * - addRowAfter() - 在当前行之后添加行
   * - deleteRow() - 删除当前行
   * - deleteTable() - 删除整个表格
   * - mergeCells() - 合并选中的单元格
   * - splitCell() - 拆分单元格
   * - toggleHeaderColumn() - 切换列为表头列
   * - toggleHeaderRow() - 切换行为表头行
   * - toggleHeaderCell() - 切换单元格为表头单元格
   * - mergeOrSplit() - 智能合并或拆分单元格
   * - setCellAttribute() - 设置单元格属性（如 colspan, rowspan）
   * - fixTables() - 修复表格结构问题
   * - goToNextCell() - 光标移动到下一个单元格
   * - goToPreviousCell() - 光标移动到上一个单元格
   * 
   * 表格操作命令示例：
   * - editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
   * - editor.chain().focus().addColumnBefore().run()
   * - editor.chain().focus().addColumnAfter().run()
   * - editor.chain().focus().deleteColumn().run()
   * - editor.chain().focus().addRowBefore().run()
   * - editor.chain().focus().addRowAfter().run()
   * - editor.chain().focus().deleteRow().run()
   * - editor.chain().focus().deleteTable().run()
   * - editor.chain().focus().mergeCells().run()
   * - editor.chain().focus().splitCell().run()
   * - editor.chain().focus().toggleHeaderColumn().run()
   * - editor.chain().focus().toggleHeaderRow().run()
   * - editor.chain().focus().toggleHeaderCell().run()
   * - editor.chain().focus().mergeOrSplit().run()
   * - editor.chain().focus().setCellAttribute('colspan', 2).run()
   * - editor.chain().focus().setCellAttribute('rowspan', 2).run()
   * - editor.chain().focus().fixTables().run()
   * - editor.chain().focus().goToNextCell().run()
   * - editor.chain().focus().goToPreviousCell().run()
   * 
   * 表格状态检查：
   * - editor.isActive('table') - 光标是否在表格中
   * - editor.isActive('tableRow') - 光标是否在表格行中
   * - editor.isActive('tableCell') - 光标是否在普通单元格中
   * - editor.isActive('tableHeader') - 光标是否在表头单元格中
   */
  TableKit.configure({
    table: {
      resizable: true, // 允许调整表格列宽
      cellMinWidth: 35, // 单元格最小宽度（像素）
      allowTableNodeSelection: false, // 是否允许选中整个表格节点
      HTMLAttributes: {
        class: "border-collapse w-full my-4 overflow-hidden border border-border rounded-md",
      },
    },
    tableRow: {
      HTMLAttributes: {
        class: "border-b border-border",
      },
    },
    tableHeader: {
      HTMLAttributes: {
        class: "border border-border px-3 py-2 text-left font-semibold bg-muted text-foreground align-top",
      },
    },
    tableCell: {
      HTMLAttributes: {
        class: "border border-border px-3 py-2 align-top",
      },
    },
  }),
];
