"use client";

import { Subscript, Superscript } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { MenuButton } from "@/components/editor/menu-button";

const SCRIPT_ACTIONS = {
  subscript: (editor: Editor) => editor.chain().focus().unsetSuperscript().setSubscript().run(),
  superscript: (editor: Editor) => editor.chain().focus().unsetSubscript().setSuperscript().run(),
};

export function ScriptButton({ editor }: { editor: Editor }) {
  const currentScript = useEditorState({
    editor,
    selector: (ctx) => {
      if (ctx.editor.isActive("subscript")) return "subscript";
      if (ctx.editor.isActive("superscript")) return "superscript";
      return "";
    },
  });

  const handleValueChange = (value: string) => {
    if (!value && currentScript) {
      editor.chain().focus()[currentScript === "subscript" ? "unsetSubscript" : "unsetSuperscript"]().run();
    }
    if (value in SCRIPT_ACTIONS) {
      SCRIPT_ACTIONS[value as keyof typeof SCRIPT_ACTIONS](editor);
    }
  };

  return (
    <ToggleGroup type="single" variant="outline" value={currentScript} onValueChange={handleValueChange}>
      <MenuButton type="toggle-group-item" value="subscript" icon={Subscript} />
      <MenuButton type="toggle-group-item" value="superscript" icon={Superscript} />
    </ToggleGroup>
  );
}
