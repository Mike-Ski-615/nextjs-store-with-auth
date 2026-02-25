"use client"

import { useState, useCallback, createContext, useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import type { Editor } from "@tiptap/react"

import { useTRPC } from "@/trpc/client"
import { useMenubarState } from "@/components/editor/menubar/menubar-context"

interface UseSaveOptions {
  editor: Editor | null
  documentId: string
}

export function useSave({ editor, documentId }: UseSaveOptions) {
  const trpc = useTRPC()
  const { actions } = useMenubarState()
  const [isSaving, setIsSaving] = useState(false)

  const saveMutation = useMutation(
    trpc.docs.saveContent.mutationOptions()
  )

  const save = useCallback(async () => {
    if (!editor) return
    setIsSaving(true)
    try {
      const content = JSON.stringify(editor.getJSON())
      await saveMutation.mutateAsync({ documentId, content })
      actions.setDirty(false)
    } catch (error) {
      console.error("保存失败:", error)
    } finally {
      setIsSaving(false)
    }
  }, [editor, documentId, saveMutation, actions])

  return { save, isSaving }
}

// Context to share save state and action across components without prop drilling
interface SaveContextValue {
  isSaving: boolean
  save: () => void | Promise<void>
}

const SaveContext = createContext<SaveContextValue>({ isSaving: false, save: () => {} })

export const SaveProvider = SaveContext.Provider

export function useSaveStatus() {
  return useContext(SaveContext)
}
