"use client"

import { createContext, useContext } from "react"

interface DocumentTableContextValue {
  onEdit: (doc: { id: string; filename: string; description: string | null }) => void
  onShare: (doc: { id: string; filename: string }) => void
  onDelete: (id: string) => void
}

const DocumentTableContext = createContext<DocumentTableContextValue | null>(null)

export function DocumentTableProvider({
  children,
  onEdit,
  onShare,
  onDelete,
}: DocumentTableContextValue & { children: React.ReactNode }) {
  return (
    <DocumentTableContext.Provider value={{ onEdit, onShare, onDelete }}>
      {children}
    </DocumentTableContext.Provider>
  )
}

export function useDocumentTable() {
  const ctx = useContext(DocumentTableContext)
  if (!ctx) throw new Error("useDocumentTable must be used within DocumentTableProvider")
  return ctx
}
