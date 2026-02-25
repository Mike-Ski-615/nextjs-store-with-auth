"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RowActions } from "@/components/documents/table/row-actions"
import { DataTableColumnHeader } from "@/components/documents/table/data-table-column-header"
import {
  Avatar,
  AvatarImage,
  AvatarGroup,
  AvatarFallback,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import {
  formatDate,
  ROLE_CONFIG,
  DEFAULT_AVATAR,
  MAX_VISIBLE_AVATARS,
} from "@/components/documents/types"

export type Document = {
  id: string
  filename: string
  description: string | null
  userRole: string
  owner: any
  collaborators: any[]
  updatedAt: string | Date
  updateCount: number
}

export const columns: ColumnDef<Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="全选"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="选择行"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="文档名称" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="font-medium">{row.original.filename}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="描述" />
    ),

    cell: ({ row }) => (
      <div className="max-w-md text-sm text-muted-foreground">
        {row.original.description ? (
          <span className="line-clamp-2">{row.original.description}</span>
        ) : (
          <span className="italic">无描述</span>
        )}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "userRole",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="角色" />
    ),
    cell: ({ row }) => {
      const roleKey = row.original.userRole as keyof typeof ROLE_CONFIG
      const config = roleKey in ROLE_CONFIG ? ROLE_CONFIG[roleKey] : ROLE_CONFIG.READ
      const Icon = config.icon
      return (
        <Badge variant={config.variant} className="gap-1">
          <Icon className="h-3 w-3" />
          {config.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "collaborators",
    header: "参与者",
    cell: ({ row }) => {
      const { owner, collaborators } = row.original
      const unique = Array.from(
        new Map(
          [owner, ...collaborators.map((c: any) => c.user)].map((p: any) => [
            p.id,
            p,
          ])
        ).values()
      )
      const visible = unique.slice(0, MAX_VISIBLE_AVATARS)
      const remaining = unique.length - MAX_VISIBLE_AVATARS
      return (
        <AvatarGroup>
          {visible.map((p: any) => (
            <Avatar key={p.id}>
              <AvatarImage src={p.image ?? DEFAULT_AVATAR} alt={p.name} />
              <AvatarFallback>
                <img src={DEFAULT_AVATAR} alt={p.name} />
              </AvatarFallback>
            </Avatar>
          ))}
          {remaining > 0 && <AvatarGroupCount>+{remaining}</AvatarGroupCount>}
        </AvatarGroup>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="最后更新" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.updatedAt)}
      </span>
    ),
  },
  {
    accessorKey: "updateCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="编辑次数" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.updateCount}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions doc={row.original} />,
    enableHiding: false,
  },
]