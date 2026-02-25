"use client";

import { Italic } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function ItalicButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("italic"),
  });

  return (
    <MenuButton
      type="button"
      icon={Italic}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleItalic().run()}
    />
  );
}
