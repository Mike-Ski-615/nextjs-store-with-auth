"use client"

import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, PlusIcon } from "lucide-react"
import { useQuery, useMutation } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { columns } from "@/components/documents/table/columns"
import { DataTable } from "@/components/documents/table/data-table"
import { DocumentTableProvider } from "@/components/documents/table/document-table-context"
import { EditDialog } from "@/components/documents/dialogs/edit-dialog"
import { ShareDialog } from "@/components/documents/dialogs/share-dialog"
import { CreateDialog } from "@/components/documents/dialogs/create-dialog"

interface DocumentListClientProps {
  initialDocuments: any[]
}

export function DocumentListClient({ initialDocuments }: DocumentListClientProps) {
  const router = useRouter()
  const trpc = useTRPC()

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editDoc, setEditDoc] = useState<{ id: string; filename: string; description: string | null } | null>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [shareDoc, setShareDoc] = useState<{ id: string; filename: string } | null>(null)

  const { data, refetch } = useQuery({
    ...trpc.docs.list.queryOptions(),
    initialData: { documents: initialDocuments },
  })
  const documents = data?.documents ?? []

  const deleteMutation = useMutation({
    ...trpc.docs.delete.mutationOptions(),
    onSuccess: () => { toast.success("文档已删除"); refetch() },
    onError: (error) => toast.error(error.message),
  })

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">还没有文档</h3>
        <p className="text-sm text-muted-foreground mb-4">
          创建您的第一个协作文档，开始与团队成员实时协作编辑
        </p>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          新建文档
        </Button>
        <CreateDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSuccess={() => { refetch(); setCreateOpen(false) }}
        />
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <DocumentTableProvider
        onEdit={(doc) => { setEditDoc(doc); setEditOpen(true) }}
        onShare={(doc) => { setShareDoc(doc); setShareOpen(true) }}
        onDelete={(id) => deleteMutation.mutate({ id })}
      >
        <DataTable
          columns={columns}
          data={documents}
          onRowClick={(row) => router.push(`/documents/${row.id}`)}
          onNewDocument={() => setCreateOpen(true)}
        />
      </DocumentTableProvider>

      <CreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={() => { refetch(); setCreateOpen(false) }}
      />
      <EditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        document={editDoc}
        onSuccess={() => { refetch(); setEditOpen(false) }}
      />
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        documentId={shareDoc?.id ?? ""}
        documentName={shareDoc?.filename ?? ""}
      />
    </div>
  )
}