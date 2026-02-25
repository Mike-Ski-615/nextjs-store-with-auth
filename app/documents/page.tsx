import { Suspense } from "react"

import { DocumentList } from "@/components/documents/document-list"
import { DataTableSkeleton } from "@/components/documents/table/data-table-skeleton"

export default function DocumentManagementPage() {
  return (
    <div className="flex-1 space-y-4 p-6 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">我的文档</h2>
        <p className="text-muted-foreground">管理和浏览您的所有协作文档</p>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <DocumentList />
      </Suspense>
    </div>
  )
}
