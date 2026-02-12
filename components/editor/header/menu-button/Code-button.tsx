"use client";

import { MenuButton } from "../../menu-button";
import { Code } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

export function CodeButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("code"),
  });

  return (
    <MenuButton
      icon={Code}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleCode().run()}
    />
  );
}
