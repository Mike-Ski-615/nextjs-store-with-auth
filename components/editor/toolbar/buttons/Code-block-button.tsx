"use client";

import { CodeSquare } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";

export function CodeBlockButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("codeBlock"),
  });

  return (
    <MenuButton
      icon={CodeSquare}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
    />
  );
}
