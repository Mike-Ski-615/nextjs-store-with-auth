"use client"

import "katex/dist/katex.min.css"
import { useEditor, EditorContent } from "@tiptap/react"
import { useLiveblocksExtension, useIsEditorReady, FloatingToolbar, FloatingComposer, AiToolbar } from "@liveblocks/react-tiptap"

import { tiptapExtensions } from "@/lib/extensions"
import { EditorSkeleton } from "@/components/editor/editor-skeleton"
import { MenuBar } from "@/components/editor/menubar/menubar"
import { Toolbar } from "@/components/editor/toolbar/toolbar"
import { Sidebar } from "@/components/editor/sidebar/sidebar"
import { ThreadsPanel } from "@/components/editor/threads/threads-panel"
import { VersionHistoryPanel } from "@/components/editor/version-history/version-history-panel"
import { useMenubarState } from "@/components/editor/menubar/menubar-context"

export function EditorShell() {
  const { state, actions } = useMenubarState()
  const liveblocks = useLiveblocksExtension({
    ai: {
      name: "AI 助手",
    },
  })

  const editor = useEditor({
    extensions: [
      ...tiptapExtensions,
      liveblocks,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none mx-auto focus:outline-none mx-4 my-6",
      },
    },
  })

  const isEditorReady = useIsEditorReady()

  if (!editor) return null

  return (
    <>
      <MenuBar editor={editor} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Toolbar editor={editor} />
        <div className="flex-1 overflow-y-auto px-4 flex">
          <div className="flex-1 relative">
            {!isEditorReady && <EditorSkeleton />}
            <div className={isEditorReady ? "opacity-100" : "opacity-0"}>
              <EditorContent editor={editor} />
              <FloatingToolbar editor={editor} />
              <FloatingComposer editor={editor} style={{ width: 350 }} />
              <AiToolbar editor={editor} />
            </div>
          </div>
        </div>
        <Sidebar editor={editor} />
      </div>
      <ThreadsPanel editor={editor} />
      <VersionHistoryPanel
        editor={editor}
        open={state.isVersionHistoryOpen}
        onOpenChange={actions.setVersionHistoryOpen}
      />
    </>
  )
}
