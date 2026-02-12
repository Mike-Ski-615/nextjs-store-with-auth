"use client";

import { MenuButton } from "../../menu-button";
import { Italic } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

export function ItalicButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("italic"),
  });

  return (
    <MenuButton
      
      icon={Italic}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleItalic().run()}
    />
  );
}
