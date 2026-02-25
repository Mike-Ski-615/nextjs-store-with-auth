"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { AlignLeft, AlignRight, AlignCenter, AlignJustify } from "lucide-react";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { MenuButton } from "@/components/editor/menu-button";

export function TextAlignButton({ editor }: { editor: Editor }) {
  const currentAlign = useEditorState({
    editor,
    selector: (ctx) => {
      if (ctx.editor.isActive({ textAlign: "center" })) return "center";
      if (ctx.editor.isActive({ textAlign: "right" })) return "right";
      if (ctx.editor.isActive({ textAlign: "justify" })) return "justify";
      return "left";
    },
  });

  const handleValueChange = (value: string) => {
    if (!value) return;
    editor.chain().focus().setTextAlign(value).run();
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={currentAlign}
      onValueChange={handleValueChange}
    >
      <MenuButton type="toggle-group-item" value="left" icon={AlignLeft} />
      <MenuButton type="toggle-group-item" value="center" icon={AlignCenter} />
      <MenuButton type="toggle-group-item" value="right" icon={AlignRight} />
      <MenuButton
        type="toggle-group-item"
        value="justify"
        icon={AlignJustify}
      />
    </ToggleGroup>
  );
}
