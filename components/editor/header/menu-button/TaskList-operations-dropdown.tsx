"use client";

import {
  ListChecks,
  Split,
  IndentIncrease,
  IndentDecrease,
} from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function TaskListOperationsDropdown({ editor }: { editor: Editor }) {
  // 检查光标是否在任务列表中
  const isInTaskList = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("taskList"),
  });

  // 如果不在任务列表中，不显示此菜单
  if (!isInTaskList) return null;

  const operations = [
    {
      label: "切换任务",
      icon: ListChecks,
      action: () => editor.chain().focus().toggleTaskList().run(),
      canExecute: true,
    },
    {
      label: "分割项",
      icon: Split,
      action: () => editor.chain().focus().splitListItem("taskItem").run(),
      canExecute: editor.can().splitListItem("taskItem"),
    },
    {
      label: "增加缩进",
      icon: IndentIncrease,
      action: () => editor.chain().focus().sinkListItem("taskItem").run(),
      canExecute: editor.can().sinkListItem("taskItem"),
    },
    {
      label: "减少缩进",
      icon: IndentDecrease,
      action: () => editor.chain().focus().liftListItem("taskItem").run(),
      canExecute: editor.can().liftListItem("taskItem"),
    },
  ];

  return (
    <MenuButton
      type="dropdown"
      icon={ListChecks}
      text="任务操作"
      pressed={isInTaskList}
    >
      {operations.map((op, index) => (
        <DropdownMenuItem
          key={index}
          onClick={op.action}
          disabled={!op.canExecute}
        >
          <op.icon />
          {op.label}
        </DropdownMenuItem>
      ))}
    </MenuButton>
  );
}
