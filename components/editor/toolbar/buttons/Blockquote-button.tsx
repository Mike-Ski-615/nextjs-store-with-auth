"use client";

import { Quote } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";

export function BlockquoteButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("blockquote"),
  });

  return (
    <MenuButton
      icon={Quote}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
    />
  );
}
