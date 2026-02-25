"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTRPC } from "@/trpc/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { createDocumentSchema, type CreateDocumentInput } from "@/trpc/schemas/documents"
import { Dialog, DialogTitle, DialogFooter, DialogHeader, DialogContent, DialogDescription } from "@/components/ui/dialog"

interface CreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateDialog({ open, onOpenChange, onSuccess }: CreateDialogProps) {
  const trpc = useTRPC()

  const form = useForm<CreateDocumentInput>({
    resolver: zodResolver(createDocumentSchema),
    mode: "onChange",
    defaultValues: { filename: "", description: undefined },
  })

  const createMutation = useMutation({
    ...trpc.docs.create.mutationOptions(),
    onSuccess: () => { toast.success("文档创建成功"); form.reset(); onOpenChange(false); onSuccess?.() },
    onError: (error: any) => toast.error(error.message),
  })

  const isSubmitting = createMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建新文档</DialogTitle>
          <DialogDescription>输入文档标题和描述来创建一个新的协作文档</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(v => createMutation.mutate(v))} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.filename}>
              <FieldLabel htmlFor="filename">文档标题 *</FieldLabel>
              <Input id="filename" disabled={isSubmitting} aria-invalid={!!form.formState.errors.filename} placeholder="输入文档标题" {...form.register("filename")} />
              {form.formState.errors.filename && <FieldError errors={[form.formState.errors.filename]} />}
            </Field>
            <Field data-invalid={!!form.formState.errors.description}>
              <FieldLabel htmlFor="description">描述（可选）</FieldLabel>
              <Textarea id="description" disabled={isSubmitting} aria-invalid={!!form.formState.errors.description} placeholder="输入文档描述" rows={3} {...form.register("description")} />
              {form.formState.errors.description && <FieldError errors={[form.formState.errors.description]} />}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>取消</Button>
            <Button type="submit" disabled={!form.formState.isValid || isSubmitting}>{isSubmitting ? "创建中..." : "创建文档"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
