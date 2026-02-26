import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { trpc, getQueryClient } from "@/trpc/server"
import { DocumentListClient } from "@/components/documents/document-list-client"

export async function DocumentList() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(trpc.docs.list.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentListClient />
    </HydrationBoundary>
  )
}
