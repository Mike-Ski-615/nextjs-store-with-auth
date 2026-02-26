"use client"

import { useIsEditorReady } from "@liveblocks/react-tiptap"

export function SaveIndicator() {
  const isReady = useIsEditorReady()

  const statusText = isReady ? "已同步" : "同步中..."
  const dotColor = isReady ? "bg-green-500" : "bg-blue-500"

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600">{statusText}</span>
      <span className={`w-2.5 h-2.5 rounded-full transition-colors ${dotColor}`} />
    </div>
  )
}
