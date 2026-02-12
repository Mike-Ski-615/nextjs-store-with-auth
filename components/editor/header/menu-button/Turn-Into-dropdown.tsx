"use client";

import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { MenuButton } from "../../menu-button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Editor, useEditorState } from "@tiptap/react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_CONFIG = [
  { level: 1 as Level, Icon: Heading1 },
  { level: 2 as Level, Icon: Heading2 },
  { level: 3 as Level, Icon: Heading3 },
  { level: 4 as Level, Icon: Heading4 },
  { level: 5 as Level, Icon: Heading5 },
  { level: 6 as Level, Icon: Heading6 },
];

export function TurnIntoDropdown({ editor }: { editor: Editor }) {
  const level = useEditorState({
    editor,
    selector: (ctx) => {
      return ctx.editor.getAttributes("heading").level;
    }
  });

  return (
    <MenuButton
      type="dropdown"
      icon={Heading}
      text={level ? `${level}级标题` : "段落"}
    >
      {HEADING_CONFIG.map(({ level, Icon }) => (
        <DropdownMenuItem
          key={level}
          onSelect={() =>
            editor.chain().focus().toggleHeading({ level }).run()
          }
        >
          <Icon />
          {level}级标题
        </DropdownMenuItem>
      ))}
    </MenuButton>
  );
}
