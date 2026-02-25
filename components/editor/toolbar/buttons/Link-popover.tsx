"use client";

import { useCallback } from "react";
import { Link2, Link2Off } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function LinkPopover({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("link"),
  });

  const addLink = useCallback(() => {
    const url = window.prompt("输入链接地址");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  return (
    <>
      {!isActive ? (
        <MenuButton type="button" icon={Link2} onPressedChange={addLink} />
      ) : (
        <MenuButton
          type="button"
          icon={Link2Off}
          onPressedChange={() => editor.chain().focus().unsetLink().run()}
        />
      )}
    </>
  );
}
