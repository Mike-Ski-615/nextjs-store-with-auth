"use client";

import { MenuButton } from "../../menu-button";
import { Underline } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

export function UnderlineButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("underline"),
  });

  return (
    <MenuButton
      icon={Underline}
      pressed={isActive}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
    />
  );
}
