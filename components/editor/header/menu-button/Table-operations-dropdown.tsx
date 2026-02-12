"use client";

import {
  Table,
  Columns,
  Rows,
  Trash2,
  Minus,
  Merge,
  Split,
  Heading,
  ArrowRight,
  ArrowLeft,
  Wrench,
} from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function TableOperationsDropdown({ editor }: { editor: Editor }) {
  // 检查光标是否在表格中
  const isInTable = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("table"),
  });

  // 实时检查是否可以合并单元格
  const canMergeCells = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.can().mergeCells(),
  });

  // 实时检查是否可以拆分单元格
  const canSplitCell = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.can().splitCell(),
  });

  // 如果不在表格中，不显示此菜单
  if (!isInTable) return null;

  const operations = [
    {
      label: "前插列",
      icon: Columns,
      action: () => editor.chain().focus().addColumnBefore().run(),
      canExecute: editor.can().addColumnBefore(),
    },
    {
      label: "后插列",
      icon: Columns,
      action: () => editor.chain().focus().addColumnAfter().run(),
      canExecute: editor.can().addColumnAfter(),
    },
    {
      label: "删除列",
      icon: Minus,
      action: () => editor.chain().focus().deleteColumn().run(),
      canExecute: editor.can().deleteColumn(),
    },
    {
      label: "上插行",
      icon: Rows,
      action: () => editor.chain().focus().addRowBefore().run(),
      canExecute: editor.can().addRowBefore(),
    },
    {
      label: "下插行",
      icon: Rows,
      action: () => editor.chain().focus().addRowAfter().run(),
      canExecute: editor.can().addRowAfter(),
    },
    {
      label: "删除行",
      icon: Minus,
      action: () => editor.chain().focus().deleteRow().run(),
      canExecute: editor.can().deleteRow(),
    },
    {
      label: "合并格",
      icon: Merge,
      action: () => editor.chain().focus().mergeCells().run(),
      canExecute: canMergeCells,
    },
    {
      label: "拆分格",
      icon: Split,
      action: () => editor.chain().focus().splitCell().run(),
      canExecute: canSplitCell,
    },
    {
      label: "智能合并",
      icon: Merge,
      action: () => editor.chain().focus().mergeOrSplit().run(),
      canExecute: editor.can().mergeOrSplit(),
    },
    {
      label: "表头列",
      icon: Heading,
      action: () => editor.chain().focus().toggleHeaderColumn().run(),
      canExecute: editor.can().toggleHeaderColumn(),
    },
    {
      label: "表头行",
      icon: Heading,
      action: () => editor.chain().focus().toggleHeaderRow().run(),
      canExecute: editor.can().toggleHeaderRow(),
    },
    {
      label: "表头格",
      icon: Heading,
      action: () => editor.chain().focus().toggleHeaderCell().run(),
      canExecute: editor.can().toggleHeaderCell(),
    },
    {
      label: "下一格",
      icon: ArrowRight,
      action: () => editor.chain().focus().goToNextCell().run(),
      canExecute: editor.can().goToNextCell(),
    },
    {
      label: "上一格",
      icon: ArrowLeft,
      action: () => editor.chain().focus().goToPreviousCell().run(),
      canExecute: editor.can().goToPreviousCell(),
    },
    {
      label: "修复表格",
      icon: Wrench,
      action: () => editor.chain().focus().fixTables().run(),
      canExecute: true, // fixTables 总是可用
    },
    {
      label: "删除表格",
      icon: Trash2,
      action: () => editor.chain().focus().deleteTable().run(),
      canExecute: editor.can().deleteTable(),
    },
  ];

  return (
    <MenuButton
      type="dropdown"
      icon={Table}
      text="表格操作"
      pressed={isInTable}
    >
      {operations.map((op, index) => (
        <DropdownMenuItem
          key={index}
          onClick={op.action}
          disabled={!op.canExecute}
        >
          <op.icon />
          {op.label}
        </DropdownMenuItem>
      ))}
    </MenuButton>
  );
}
