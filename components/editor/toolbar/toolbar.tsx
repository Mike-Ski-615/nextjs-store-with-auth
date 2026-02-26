"use client";

import { Editor } from "@tiptap/react";

import { Separator } from "@/components/ui/separator";
import { BoldButton } from "@/components/editor/toolbar/buttons/bold-button";
import { CodeButton } from "@/components/editor/toolbar/buttons/code-button";
import { MathButton } from "@/components/editor/toolbar/buttons/math-button";
import { LinkPopover } from "@/components/editor/toolbar/buttons/link-popover";
import { ItalicButton } from "@/components/editor/toolbar/buttons/italic-button";
import { ScriptButton } from "@/components/editor/toolbar/buttons/script-button";
import { StrikeButton } from "@/components/editor/toolbar/buttons/strike-button";
import { TablePopover } from "@/components/editor/toolbar/buttons/table-popover";
import { UndoRedoButton } from "@/components/editor/toolbar/buttons/undo-redo-button";
import { UnderlineButton } from "@/components/editor/toolbar/buttons/underline-button";
import { CodeBlockButton } from "@/components/editor/toolbar/buttons/code-block-button";
import { HardBreakButton } from "@/components/editor/toolbar/buttons/hard-break-button";
import { TextAlignButton } from "@/components/editor/toolbar/buttons/text-align-button";
import { BlockquoteButton } from "@/components/editor/toolbar/buttons/blockquote-button";
import { ColorTextPopover } from "@/components/editor/toolbar/buttons/color-text-popover";
import { ListDropdownMenu } from "@/components/editor/toolbar/buttons/list-dropdown-menu";
import { TurnIntoDropdown } from "@/components/editor/toolbar/buttons/turn-into-dropdown";
import { ImageUploadButton } from "@/components/editor/toolbar/buttons/image-upload-button";
import { LineHeightDropdown } from "@/components/editor/toolbar/buttons/line-height-dropdown";
import { HorizontalRuleButton } from "@/components/editor/toolbar/buttons/horizontal-rule-button";
import { ColorHighlightPopover } from "@/components/editor/toolbar/buttons/color-highlight-popover";
import { TableOperationsDropdown } from "@/components/editor/toolbar/buttons/table-operations-dropdown";
import { TaskListOperationsDropdown } from "@/components/editor/toolbar/buttons/tasklist-operations-dropdown";

export function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center gap-1 p-1 border-y flex-wrap overflow-x-auto">
      {/* 撤销/重做 - button 类型（独立按钮） */}
      <UndoRedoButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 段落样式 - dropdown 类型（下拉列表） */}
      <TurnIntoDropdown editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 基础文本格式 - button 类型（连续的独立按钮） */}
      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      <UnderlineButton editor={editor} />
      <StrikeButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 上下标 - toggle-group-item 类型（连着的按钮组） */}
      <ScriptButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 颜色和高亮 - popover 类型（弹窗选择器） */}
      <ColorTextPopover editor={editor} />
      <ColorHighlightPopover editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 行高 - dropdown 类型（下拉列表） */}
      <LineHeightDropdown editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 对齐方式 - toggle-group-item 类型（连着的按钮组） */}
      <TextAlignButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 列表 - dropdown 类型（下拉列表） */}
      <ListDropdownMenu editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 引用和代码块 - button 类型（独立按钮） */}
      <BlockquoteButton editor={editor} />
      <CodeBlockButton editor={editor} />
      <CodeButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 分隔符和换行 - button 类型（独立按钮） */}
      <HorizontalRuleButton editor={editor} />
      <HardBreakButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 插入功能 - popover/button 类型 */}
      <LinkPopover editor={editor} />
      <ImageUploadButton editor={editor} />
      <MathButton editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 表格 - popover 插入，dropdown 操作 */}
      <TablePopover editor={editor} />
      <TableOperationsDropdown editor={editor} />

      <Separator orientation="vertical" className="h-8 mx-1" />

      {/* 任务列表操作 - dropdown 类型（下拉列表） */}
      <TaskListOperationsDropdown editor={editor} />
    </div>
  );
}
