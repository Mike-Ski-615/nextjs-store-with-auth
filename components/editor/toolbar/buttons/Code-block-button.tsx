"use client";

import { CodeSquare } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function CodeBlockButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("codeBlock"),
  });

  return (
    <MenuButton
      type="button"
      icon={CodeSquare}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
    />
  );
}
