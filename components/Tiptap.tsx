"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { getTiptapExtensions } from "@/lib/tiptap-extensions";
import { Toolbar } from "./editor/toolbar/toolbar";
import { CharacterCount } from "./editor/character-count";
import "katex/dist/katex.min.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: getTiptapExtensions(), // 使用模块化的扩展配置
    content: `
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, and <u>underline</u> text.</p>
      `,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none mt-2 px-2 min-h-[200px]",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <DragHandle editor={editor} nested={{ edgeDetection: { threshold: -16 } }}>
          <div className="drag-handle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>
        </DragHandle>
        <EditorContent editor={editor} />
      </div>
      <CharacterCount editor={editor} />
    </div>
  );
};

export default Tiptap;
