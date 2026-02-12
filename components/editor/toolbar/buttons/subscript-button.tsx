"use client";

import { Subscript } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";

export function SubscriptButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("subscript"),
  });

  return (
    <MenuButton
      type="button"
      icon={Subscript}
      text="下标"
      pressed={isActive}
      onClick={() => editor.chain().focus().toggleSubscript().run()}
    />
  );
}
