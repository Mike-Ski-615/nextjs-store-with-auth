"use client";

import { Separator } from "@/components/ui/separator";
import { UndoRedoButton } from "./menu-button/Undo-redo-button";
import { TurnIntoDropdown } from "./menu-button/Turn-Into-dropdown";
import { BoldButton } from "./menu-button/Bold-button";
import { ItalicButton } from "./menu-button/Italic-button";
import { UnderlineButton } from "./menu-button/Underline-button";
import { StrikeButton } from "./menu-button/Strike-button";
import { CodeButton } from "./menu-button/Code-button";
import { ColorHighlightPopover } from "./menu-button/Color-highlight-popover";
import { ColorTextPopover } from "./menu-button/Color-text-popover";
import { TextAlignButton } from "./menu-button/Text-align-button";
import { ListDropdownMenu } from "./menu-button/List-dropdown-menu";
import { BlockquoteButton } from "./menu-button/Blockquote-button";
import { CodeBlockButton } from "./menu-button/Code-block-button";
import { LinkPopover } from "./menu-button/Link-popover";
import { ImageUploadButton } from "./menu-button/Image-upload-button";
import { MathButton } from "./menu-button/Math-button";
import { TablePopover } from "./menu-button/Table-popover";
import { TableOperationsDropdown } from "./menu-button/Table-operations-dropdown";
import { TaskListOperationsDropdown } from "./menu-button/TaskList-operations-dropdown";
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
