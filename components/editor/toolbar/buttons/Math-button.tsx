"use client";

import { MenuButton } from "../../menu-button";
import { Sigma } from "lucide-react";
import { useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";

export function MathButton({ editor }: { editor: Editor }) {
    const insertInlineMath = useCallback(() => {
        const latex = window.prompt('Enter inline LaTeX formula:', 'x^2 + y^2 = z^2');
        if (latex) {
            editor.chain().focus().insertInlineMath({ latex }).run();
        }
    }, [editor]);

    const insertBlockMath = useCallback(() => {
        const latex = window.prompt('Enter block LaTeX formula:', '\\sum_{i=1}^{n} x_i');
        if (latex) {
            editor.chain().focus().insertBlockMath({ latex }).run();
        }
    }, [editor]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Toggle variant="outline" size="sm" className="gap-2">
                    <Sigma />
                </Toggle>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={insertInlineMath}>
                    <Sigma className="h-4 w-4 mr-2" />
                    Inline Math
                </DropdownMenuItem>
                <DropdownMenuItem onClick={insertBlockMath}>
                    <Sigma className="h-4 w-4 mr-2" />
                    Block Math
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
