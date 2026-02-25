"use client";

import { Quote } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function BlockquoteButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("blockquote"),
  });

  return (
    <MenuButton
      type="button"
      icon={Quote}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
    />
  );
}
