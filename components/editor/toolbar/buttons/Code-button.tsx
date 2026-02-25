"use client";

import { Code } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function CodeButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("code"),
  });

  return (
    <MenuButton
      type="button"
      icon={Code}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleCode().run()}
    />
  );
}
