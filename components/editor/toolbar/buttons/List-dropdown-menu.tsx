"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { List, ListChecks, ListOrdered } from "lucide-react";

import { MenuButton } from "@/components/editor/menu-button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ListDropdownMenu({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) =>
      ctx.editor.isActive("bulletList") ||
      ctx.editor.isActive("orderedList") ||
      ctx.editor.isActive("taskList"),
  });

  return (
    <MenuButton type="dropdown" icon={List} text="列表" pressed={isActive}>
      <DropdownMenuItem
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
        无序列表
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
        有序列表
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      >
        <ListChecks />
        任务列表
      </DropdownMenuItem>
    </MenuButton>
  );
}
