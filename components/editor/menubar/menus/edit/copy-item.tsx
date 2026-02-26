'use client';

import { Copy } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

import type { MenuComponentProps } from '../../types';

export function CopyItem({ editor }: MenuComponentProps) {
  const hasSelection = useEditorState({
    editor,
    selector: (ctx) => ctx.editor ? !ctx.editor.state.selection.empty : false,
  });

  const handleCopy = async () => {
    const selectedText = window.getSelection()?.toString() || '';
    if (!selectedText || !navigator.clipboard) return;
    await navigator.clipboard.writeText(selectedText);
  };

  return (
    <MenubarItem disabled={!hasSelection} onClick={handleCopy} aria-label={hasSelection ? '复制选中内容' : '无选中内容可复制'}>
      <Copy  />
      复制
      <MenubarShortcut>⌘C</MenubarShortcut>
    </MenubarItem>
  );
}
