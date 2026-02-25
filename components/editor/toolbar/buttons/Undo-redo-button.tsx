"use client";

import { Redo, Undo } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function UndoRedoButton({ editor }: { editor: Editor }) {
  const { canUndo, canRedo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });

  return (
    <div className="flex items-center gap-1">
      <MenuButton
        type="button"
        icon={Undo}
        pressed={false}
        disabled={!canUndo}
        onPressedChange={() => editor.chain().focus().undo().run()}
      />
      <MenuButton
        type="button"
        icon={Redo}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!canRedo}
        pressed={false}
      />
    </div>
  );
}
