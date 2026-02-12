"use client";

import { MenuButton } from "../../menu-button";
import { Image as ImageIcon } from "lucide-react";
import { useCallback } from "react";
import { Editor, useEditorState } from "@tiptap/react";

export function ImageUploadButton({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("image"),
  });

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <MenuButton
      icon={ImageIcon}
      pressed={isActive}
      onPressedChange={addImage}
    />
  );
}
