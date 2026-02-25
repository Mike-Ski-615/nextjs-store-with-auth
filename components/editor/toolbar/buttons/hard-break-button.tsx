"use client";

import { Editor } from "@tiptap/react";
import { CornerDownLeft } from "lucide-react";

import { MenuButton } from "@/components/editor/menu-button";

export function HardBreakButton({ editor }: { editor: Editor }) {
  return (
    <MenuButton
      type="button"
      icon={CornerDownLeft}
      onPressedChange={() => editor.chain().focus().setHardBreak().run()}
    />
  );
}
