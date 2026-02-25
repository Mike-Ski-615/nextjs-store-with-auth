"use client";

import "katex/dist/katex.min.css";
import { useEditor, EditorContent } from "@tiptap/react";

import { tiptapExtensions } from "@/lib/extensions";
import { MenuBar } from "@/components/editor/menubar/menubar";
import { Toolbar } from "@/components/editor/toolbar/toolbar";
import { Sidebar } from "@/components/editor/sidebar/sidebar";
import { MenubarProvider } from "@/components/editor/menubar/menubar-context";

const Tiptap = () => {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: "你好",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none mx-auto focus:outline-none m-1",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <MenubarProvider>
      <div className="w-full h-screen flex flex-col">
        <MenuBar editor={editor} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Toolbar editor={editor} />
          <div className="flex-1 overflow-y-auto px-4">
            <EditorContent editor={editor} />
          </div>
          <Sidebar editor={editor} />
        </div>
      </div>
    </MenubarProvider>
  );
};

export default Tiptap;
