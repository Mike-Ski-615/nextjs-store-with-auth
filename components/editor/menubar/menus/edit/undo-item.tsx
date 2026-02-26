'use client';

import { Undo2 } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

import type { MenuComponentProps } from '../../types';

export function UndoItem({ editor }: MenuComponentProps) {
  const canUndo = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.can().undo() ?? false,
  });

  return (
    <MenubarItem
      disabled={!canUndo}
      onClick={() => editor?.chain().focus().undo().run()}
      aria-label={canUndo ? '撤销上一步操作' : '无法撤销'}
    >
      <Undo2  />
      撤销
      <MenubarShortcut>⌘Z</MenubarShortcut>
    </MenubarItem>
  );
}
