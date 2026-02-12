"use client";

import { Palette, Ban } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const TEXT_COLORS = [
  { color: "#000000" },
  { color: "#ef4444" },
  { color: "#3b82f6" },
  { color: "#22c55e" },
  { color: "#eab308" },
  { color: "#a855f7" },
  { color: "#ec4899" },
  { color: "#f97316" },
  { color: "#6b7280" },
  { color: "#06b6d4" },
];

export function ColorTextPopover({ editor }: { editor: Editor }) {
  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("textStyle"),
  });

  return (
    <MenuButton
      type="popover"
      icon={Palette}
      text="文字颜色"
      pressed={isActive}
    >
      <div className="flex items-center gap-2">
        {/* 颜色选择器 */}
        <div className="grid grid-cols-5 gap-2">
          {TEXT_COLORS.map((item, index) => (
            <Button
              key={index}
              onClick={() => editor.chain().focus().setColor(item.color).run()}
              size="icon"
              style={{ backgroundColor: item.color }}
            />
          ))}
        </div>

        {/* 分隔线 */}
        <Separator orientation="vertical" />

        {/* 清除按钮 */}
        <Button
          onClick={() => editor.chain().focus().unsetColor().run()}
          variant="secondary"
          size="icon"
        >
          <Ban />
        </Button>
      </div>
    </MenuButton>
  );
}
