"use client";

import { Link as LinkIcon } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor, useEditorState } from "@tiptap/react";

export function LinkPopover({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");

  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("link"),
  });

  // 当链接激活时，获取当前链接的 URL
  useEffect(() => {
    if (isActive) {
      const currentUrl = editor.getAttributes("link").href || "";
      setUrl(currentUrl);
    }
  }, [isActive, editor]);

  const setLink = () => {
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setUrl("");
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setUrl("");
  };

  return (
    <MenuButton type="popover" icon={LinkIcon} pressed={isActive}>
      <div className="space-y-2 p-2 w-64">
        <Input
          type="url"
          placeholder="输入链接地址"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setLink();
            }
          }}
        />
        <div className="flex gap-2">
          <Button onClick={setLink} size="sm" className="flex-1">
            设置链接
          </Button>
          <Button
            onClick={removeLink}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            移除链接
          </Button>
        </div>
      </div>
    </MenuButton>
  );
}
