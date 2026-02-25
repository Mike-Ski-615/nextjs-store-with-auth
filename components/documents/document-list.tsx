import { trpc } from "@/trpc/server"
import { DocumentListClient } from "@/components/documents/document-list-client"

export async function DocumentList() {
  const caller = await trpc()
  const { documents } = await caller.docs.list()
  return <DocumentListClient initialDocuments={documents} />
}
