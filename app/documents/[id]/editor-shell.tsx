"use client"

import { useEditor, EditorContent } from "@tiptap/react"

import { tiptapExtensions } from "@/lib/extensions"
import { useSave, SaveProvider } from "@/hooks/use-save"
import { MenuBar } from "@/components/editor/menubar/menubar"
import { Toolbar } from "@/components/editor/toolbar/toolbar"
import { Sidebar } from "@/components/editor/sidebar/sidebar"
import { useMenubarState } from "@/components/editor/menubar/menubar-context"

interface EditorShellProps {
  documentId: string
  filename: string
  initialContent: string | null
}

export function EditorShell({ documentId, filename, initialContent }: EditorShellProps) {
  const { actions } = useMenubarState()

  const parsedContent = initialContent ? JSON.parse(initialContent) : ""

  const editor = useEditor({
    extensions: tiptapExtensions,
    content: parsedContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none mx-auto focus:outline-none m-1",
      },
    },
    onUpdate: () => actions.setDirty(true),
  })

  const { save, isSaving } = useSave({ editor, documentId })


  if (!editor) return null

  return (
    <SaveProvider value={{ isSaving, save }}>
      <MenuBar editor={editor} filename={filename} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Toolbar editor={editor} />
        <div className="flex-1 overflow-y-auto px-4">
          <EditorContent editor={editor} />
        </div>
        <Sidebar editor={editor} />
      </div>
    </SaveProvider>
  )
}
