import { Editor } from "@tiptap/react"

import { CharactersCount } from "./buttons/characters-count"
import { SaveIndicator } from "./buttons/save-indicator"

interface SidebarProps {
  editor: Editor
}

export function Sidebar({ editor }: SidebarProps) {
  return (
    <div className="h-5 w-full border-t flex items-center justify-between px-4">
      <CharactersCount editor={editor} />
      <SaveIndicator />
    </div>
  )
}
