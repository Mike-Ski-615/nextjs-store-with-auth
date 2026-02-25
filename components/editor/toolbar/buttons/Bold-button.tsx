"use client";

import { Bold } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function BoldButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("bold"),
  });

  return (
    <MenuButton
      type="button"
      icon={Bold}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
    />
  );
}
