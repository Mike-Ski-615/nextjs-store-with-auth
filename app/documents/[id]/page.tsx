import { trpc } from "@/trpc/server"

import { EditorShell } from "./editor-shell"

export default async function DocumentPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await trpc()
  const { document } = await caller.docs.getById({ id })

  return (
    <EditorShell
      documentId={document.id}
      filename={document.filename}
      initialContent={document.yjsState}
    />
  )
}
