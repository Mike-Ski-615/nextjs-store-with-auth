"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { AlignVerticalSpaceBetween } from "lucide-react";

import { MenuButton } from "@/components/editor/menu-button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface LineHeightDropdownProps {
  editor: Editor;
}

const LINE_HEIGHT_OPTIONS = [
  { label: "1.0", value: "1.0" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "2.0", value: "2.0" },
  { label: "2.5", value: "2.5" },
  { label: "3.0", value: "3.0" },
  { label: "4.0", value: "4.0" },
];

export function LineHeightDropdown({ editor }: LineHeightDropdownProps) {
  const currentLineHeight = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("textStyle");
      return attrs.lineHeight || "段落";
    },
  });

  const handleLineHeightChange = (value: string) => {
    editor.chain().focus().setLineHeight(value).run();
  };

  return (
    <MenuButton
      type="dropdown"
      icon={AlignVerticalSpaceBetween}
      text={currentLineHeight}
    >
      {LINE_HEIGHT_OPTIONS.map((option) => (
        <DropdownMenuItem
          key={option.value}
          onSelect={() => handleLineHeightChange(option.value)}
        >
          {option.label}
        </DropdownMenuItem>
      ))}
    </MenuButton>
  );
}
