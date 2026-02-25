"use client"

import { useSaveStatus } from "@/hooks/use-save"
import { useMenubarState } from "../menubar/menubar-context"

export function SaveIndicator() {
  const { state } = useMenubarState()
  const { isSaving } = useSaveStatus()

  const statusText = isSaving ? "保存中..." : state.isDirty ? "未保存" : "已保存"
  const dotColor = isSaving ? "bg-blue-500" : state.isDirty ? "bg-black" : "bg-gray-400"

  return (
    <div className="relative group" title={statusText}>
      <div className={`w-2.5 h-2.5 rounded-full transition-colors ${dotColor}`} />
      <span className="absolute bottom-full right-0 mb-1 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {statusText}
      </span>
    </div>
  )
}
