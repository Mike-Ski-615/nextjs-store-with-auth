"use client";

import { Redo, Undo } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";

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
        icon={Undo}
        pressed={false}
        disabled={!canUndo}
        onPressedChange={() => editor.chain().focus().undo().run()}
      />
      <MenuButton
        icon={Redo}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!canRedo}
        pressed={false}
      />
    </div>
  );
}
