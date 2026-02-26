'use client';

import { Scissors } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

import type { MenuComponentProps } from '../../types';

export function CutItem({ editor }: MenuComponentProps) {
  const hasSelection = useEditorState({
    editor,
    selector: (ctx) => ctx.editor ? !ctx.editor.state.selection.empty : false,
  });

  const handleCut = async () => {
    const selectedText = window.getSelection()?.toString() || '';
    if (!selectedText || !navigator.clipboard) return;
    await navigator.clipboard.writeText(selectedText);
    editor?.chain().focus().deleteSelection().run();
  };

  return (
    <MenubarItem disabled={!hasSelection} onClick={handleCut} aria-label={hasSelection ? '剪切选中内容' : '无选中内容可剪切'}>
      <Scissors  />
      剪切
      <MenubarShortcut>⌘X</MenubarShortcut>
    </MenubarItem>
  );
}
