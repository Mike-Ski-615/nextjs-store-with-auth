"use client";

import { Separator } from "@/components/ui/separator";
import { UndoRedoButton } from "./buttons/Undo-redo-button";
import { TurnIntoDropdown } from "./buttons/Turn-Into-dropdown";
import { BoldButton } from "./buttons/Bold-button";
import { ItalicButton } from "./buttons/Italic-button";
import { UnderlineButton } from "./buttons/Underline-button";
import { StrikeButton } from "./buttons/Strike-button";
import { CodeButton } from "./buttons/Code-button";
import { SubscriptButton } from "./buttons/subscript-button";
import { SuperscriptButton } from "./buttons/superscript-button";
import { ColorHighlightPopover } from "./buttons/Color-highlight-popover";
import { ColorTextPopover } from "./buttons/Color-text-popover";
import { TextAlignButton } from "./buttons/Text-align-button";
import { ListDropdownMenu } from "./buttons/List-dropdown-menu";
import { BlockquoteButton } from "./buttons/Blockquote-button";
import { CodeBlockButton } from "./buttons/Code-block-button";
import { LinkPopover } from "./buttons/Link-popover";
import { ImageUploadButton } from "./buttons/Image-upload-button";
import { MathButton } from "./buttons/Math-button";
import { TablePopover } from "./buttons/Table-popover";
import { TableOperationsDropdown } from "./buttons/Table-operations-dropdown";
import { TaskListOperationsDropdown } from "./buttons/TaskList-operations-dropdown";
import { Editor } from "@tiptap/react";

export function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center gap-1 p-2 border-b flex-wrap">
      {/* 撤销/重做 */}
      <UndoRedoButton editor={editor} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* 标题下拉菜单 */}
      <TurnIntoDropdown editor={editor} />
      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* 文本格式 */}
      <div className="flex gap-1">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <StrikeButton editor={editor} />
        <CodeButton editor={editor} />
        <SubscriptButton editor={editor} />
        <SuperscriptButton editor={editor} />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* 颜色和高亮 */}
      <div className="flex items-center gap-1">
        <ColorHighlightPopover editor={editor} />
        <ColorTextPopover editor={editor} />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* 对齐方式 - ToggleGroup */}
      <TextAlignButton editor={editor} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* 列表下拉菜单 */}
      <ListDropdownMenu editor={editor} />
      <TaskListOperationsDropdown editor={editor} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* 其他功能 */}
      <div className="flex items-center gap-1">
        <BlockquoteButton editor={editor} />
        <CodeBlockButton editor={editor} />
        <LinkPopover editor={editor} />
        <ImageUploadButton editor={editor} />
        <MathButton editor={editor} />
        <TablePopover editor={editor} />
        <TableOperationsDropdown editor={editor} />
      </div>
    </div>
  );
}
