"use client"

import { Editor } from "@tiptap/react"

import {
    MenubarSub,
    MenubarItem,
    MenubarGroup,
    MenubarSubContent,
    MenubarSubTrigger,
} from "@/components/ui/menubar"

interface ExportButtonProps {
    editor: Editor
}

export function ExportButton({ editor }: ExportButtonProps) {
    if (!editor) return null

    return (
        <MenubarGroup>
            <MenubarSub>
                <MenubarSubTrigger>导出</MenubarSubTrigger>
                <MenubarSubContent>
                    <MenubarGroup>
                        <MenubarItem>导出为 DOCX</MenubarItem>
                        <MenubarItem>导出为 PDF</MenubarItem>
                        <MenubarItem>导出为 Markdown</MenubarItem>
                    </MenubarGroup>
                </MenubarSubContent>
            </MenubarSub>
        </MenubarGroup>
    )
}
