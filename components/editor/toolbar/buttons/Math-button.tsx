"use client";

import { useCallback } from "react";
import { Sigma } from "lucide-react";
import { Editor } from "@tiptap/react";

import { MenuButton } from "@/components/editor/menu-button";
import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function MathButton({ editor }: { editor: Editor }) {
    const insertInlineMath = useCallback(() => {
        const latex = window.prompt('输入行内 LaTeX 公式:', 'x^2 + y^2 = z^2');
        if (latex) {
            editor.chain().focus().insertInlineMath({ latex }).run();
        }
    }, [editor]);

    const insertBlockMath = useCallback(() => {
        const latex = window.prompt('输入块级 LaTeX 公式:', '\\sum_{i=1}^{n} x_i');
        if (latex) {
            editor.chain().focus().insertBlockMath({ latex }).run();
        }
    }, [editor]);

    return (
        <MenuButton
            type="dropdown"
            icon={Sigma}
        >
            <DropdownMenuItem onClick={insertInlineMath}>
                <Sigma className="h-4 w-4 mr-2" />
                行内公式
            </DropdownMenuItem>
            <DropdownMenuItem onClick={insertBlockMath}>
                <Sigma className="h-4 w-4 mr-2" />
                块级公式
            </DropdownMenuItem>
        </MenuButton>
    );
}
