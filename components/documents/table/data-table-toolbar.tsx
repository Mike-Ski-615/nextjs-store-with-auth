"use client"

import { type Table } from "@tanstack/react-table"
import { X, PlusIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ROLE_CONFIG } from "@/components/documents/types"
import { DataTableViewOptions } from "@/components/documents/table/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/documents/table/data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onNewDocument?: () => void
}

const roleOptions = Object.entries(ROLE_CONFIG).map(([value, config]) => ({
  label: config.label,
  value,
}))

export function DataTableToolbar<TData>({
  table,
  onNewDocument,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="搜索文档名称..."
        value={(table.getColumn("filename")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("filename")?.setFilterValue(event.target.value)
        }
        className="h-8 sm:hidden"
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="搜索文档名称..."
            value={(table.getColumn("filename")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("filename")?.setFilterValue(event.target.value)
            }
            className="hidden h-8 sm:block sm:w-[200px] lg:w-[280px]"
          />
          {table.getColumn("userRole") && (
            <DataTableFacetedFilter
              column={table.getColumn("userRole")}
              title="角色"
              options={roleOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={() => table.resetColumnFilters()}
            >
              重置
              <X />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          {onNewDocument && (
            <Button size="sm" className="h-8" onClick={onNewDocument}>
              <PlusIcon />
              <span className="hidden sm:inline">新建文档</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
