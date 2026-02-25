"use client";

import { Minus } from "lucide-react";
import { Editor } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";

export function HorizontalRuleButton({ editor }: { editor: Editor }) {
  return (
    <MenuButton
      type="button"
      icon={Minus}
      onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
    />
  );
}
