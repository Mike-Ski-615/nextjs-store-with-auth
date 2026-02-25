"use client";

import { Underline } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function UnderlineButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("underline"),
  });

  return (
    <MenuButton
      type="button"
      icon={Underline}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
    />
  );
}
