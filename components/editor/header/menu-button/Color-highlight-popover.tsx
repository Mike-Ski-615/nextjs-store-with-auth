"use client";

import { Highlighter, Ban } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const HIGHLIGHT_COLORS = [
  { color: "#fb923c" },
  { color: "#c084fc" },
  { color: "#fca5a5" },
  { color: "#86efac" },
  { color: "#93c5fd" },
];

export function ColorHighlightPopover({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("highlight"),
  });


  return (
    <MenuButton
      type="popover"
      icon={Highlighter}
      text="高亮"
      pressed={isActive}
    >
      <div className="flex items-center gap-2">
        {/* 颜色选择器 */}
        <div className="flex items-center gap-2">
          {HIGHLIGHT_COLORS.map((item, index) => (
            <Button
              key={index}
              onClick={() => editor.chain().focus().setHighlight({ color: item.color }).run()}
              size="icon"
              style={{ backgroundColor: item.color }}
            />
          ))}
        </div>

        {/* 分隔线 */}
        <Separator orientation="vertical" />

        {/* 清除按钮 */}
        <Button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          variant="secondary"
          size="icon"
        >
          <Ban />
        </Button>
      </div>
    </MenuButton >
  );
}
