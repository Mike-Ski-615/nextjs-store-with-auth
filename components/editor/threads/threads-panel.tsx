"use client"

import type { Editor } from "@tiptap/react"
import { useThreads } from "@liveblocks/react/suspense"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { FloatingThreads } from "@liveblocks/react-tiptap"

function ThreadsPanelContent({ editor }: { editor: Editor }) {
  const { threads } = useThreads({ query: { resolved: false } })

  return (
    <FloatingThreads
      editor={editor}
      threads={threads}
      style={{ width: 300 }}
    />
  )
}

export function ThreadsPanel({ editor }: { editor: Editor }) {
  return (
    <ClientSideSuspense fallback={null}>
      <ThreadsPanelContent editor={editor} />
    </ClientSideSuspense>
  )
}
