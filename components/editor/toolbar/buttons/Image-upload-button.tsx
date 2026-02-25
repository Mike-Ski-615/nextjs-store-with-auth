"use client";

import { useCallback } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function ImageUploadButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("image"),
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <MenuButton
      type="button"
      icon={ImageIcon}
      pressed={isActive}
      onPressedChange={addImage}
    />
  );
}
