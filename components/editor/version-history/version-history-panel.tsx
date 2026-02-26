"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import type { HistoryVersion } from "@liveblocks/client"
import { useHistoryVersions } from "@liveblocks/react/suspense"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { HistoryVersionPreview } from "@liveblocks/react-tiptap"
import { HistoryVersionSummary, HistoryVersionSummaryList } from "@liveblocks/react-ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function VersionHistoryContent({ editor }: { editor: Editor }) {
  const { versions } = useHistoryVersions()
  const [selectedVersion, setSelectedVersion] = useState<HistoryVersion | null>(null)

  return (
    <div className="flex h-[70vh] gap-4">
      {/* Version list */}
      <HistoryVersionSummaryList className="w-[240px] shrink-0 overflow-y-auto border-r pr-4">
        {versions.map((version) => (
          <HistoryVersionSummary
            key={version.id}
            version={version}
            selected={selectedVersion?.id === version.id}
            onClick={() => setSelectedVersion(version)}
          />
        ))}
      </HistoryVersionSummaryList>

      {/* Version preview */}
      <div className="flex-1 overflow-y-auto">
        {selectedVersion ? (
          <HistoryVersionPreview
            editor={editor}
            version={selectedVersion}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            选择一个版本以预览
          </div>
        )}
      </div>
    </div>
  )
}

export function VersionHistoryPanel({
  editor,
  open,
  onOpenChange,
}: {
  editor: Editor
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>版本历史</DialogTitle>
          <DialogDescription>查看和恢复文档的历史版本</DialogDescription>
        </DialogHeader>
        <ClientSideSuspense
          fallback={
            <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
              加载版本历史…
            </div>
          }
        >
          <VersionHistoryContent editor={editor} />
        </ClientSideSuspense>
      </DialogContent>
    </Dialog>
  )
}
