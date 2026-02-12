"use client";

import { Superscript } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";

export function SuperscriptButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("superscript"),
  });

  return (
    <MenuButton
      type="button"
      icon={Superscript}
      text="上标"
      pressed={isActive}
      onClick={() => editor.chain().focus().toggleSuperscript().run()}
    />
  );
}
