"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTRPC } from "@/trpc/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { updateDocumentSchema, type UpdateDocumentInput } from "@/trpc/schemas/documents"
import { Dialog, DialogTitle, DialogFooter, DialogHeader, DialogContent, DialogDescription } from "@/components/ui/dialog"

interface EditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: { id: string; filename: string; description: string | null } | null
  onSuccess?: () => void
}

export function EditDialog({ open, onOpenChange, document, onSuccess }: EditDialogProps) {
  const trpc = useTRPC()

  const form = useForm<UpdateDocumentInput>({
    resolver: zodResolver(updateDocumentSchema),
    mode: "onChange",
    defaultValues: { id: "", filename: "", description: "" },
  })

  useEffect(() => {
    if (document) {
      form.reset({ id: document.id, filename: document.filename, description: document.description ?? undefined })
    }
  }, [document, form])

  const updateMutation = useMutation({
    ...trpc.docs.update.mutationOptions(),
    onSuccess: () => { toast.success("文档已更新"); onOpenChange(false); onSuccess?.() },
    onError: (error: any) => toast.error(error.message),
  })

  const isSubmitting = updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑文档</DialogTitle>
          <DialogDescription>修改文档的标题和描述</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(v => updateMutation.mutate({ ...v }))} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.filename}>
              <FieldLabel htmlFor="edit-filename">文档标题</FieldLabel>
              <Input id="edit-filename" disabled={isSubmitting} aria-invalid={!!form.formState.errors.filename} placeholder="输入文档标题" {...form.register("filename")} />
              {form.formState.errors.filename && <FieldError errors={[form.formState.errors.filename]} />}
            </Field>
            <Field data-invalid={!!form.formState.errors.description}>
              <FieldLabel htmlFor="edit-description">描述（可选）</FieldLabel>
              <Textarea id="edit-description" disabled={isSubmitting} aria-invalid={!!form.formState.errors.description} placeholder="输入文档描述" rows={3} {...form.register("description")} />
              {form.formState.errors.description && <FieldError errors={[form.formState.errors.description]} />}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>取消</Button>
            <Button type="submit" disabled={!form.formState.isValid || isSubmitting}>{isSubmitting ? "保存中..." : "保存"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
