"use client";

import { Strikethrough } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function StrikeButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("strike"),
  });

  return (
    <MenuButton
      type="button"
      icon={Strikethrough}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleStrike().run()}
    />
  );
}
