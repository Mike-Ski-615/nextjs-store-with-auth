"use client";

import { MenuButton } from "../../menu-button";
import { Strikethrough } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

export function StrikeButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("strike"),
  });

  return (
    <MenuButton
      
      icon={Strikethrough}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleStrike().run()}
    />
  );
}
