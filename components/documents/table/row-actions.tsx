"use client"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useDocumentTable } from "@/components/documents/table/document-table-context"

import type { Document } from "@/components/documents/table/columns"

interface RowActionsProps {
  doc: Document
}

export function RowActions({ doc }: RowActionsProps) {
  const { onEdit, onShare, onDelete } = useDocumentTable()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">打开菜单</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>操作</DropdownMenuLabel>
        {(doc.userRole === "OWNER" || doc.userRole === "ADMIN") && (
          <DropdownMenuItem
            onClick={() => onEdit({
              id: doc.id,
              filename: doc.filename,
              description: doc.description,
            })}
          >
            编辑文档
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => onShare({ id: doc.id, filename: doc.filename })}
        >
          分享文档
        </DropdownMenuItem>
        {doc.userRole === "OWNER" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                if (confirm("确定要删除这个文档吗？此操作无法撤销。"))
                  onDelete(doc.id)
              }}
            >
              删除文档
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
