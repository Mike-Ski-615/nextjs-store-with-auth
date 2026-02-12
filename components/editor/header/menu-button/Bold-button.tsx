"use client";

import { MenuButton } from "../../menu-button";
import { Bold } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

export function BoldButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("bold"),
  });

  return (
    <MenuButton
      icon={Bold}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
    />
  );
}
