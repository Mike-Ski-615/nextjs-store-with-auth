'use client';

import { Redo2 } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

import type { MenuComponentProps } from '../../types';

export function RedoItem({ editor }: MenuComponentProps) {
  const canRedo = useEditorState({
    editor,
    selector: (ctx) => ctx.editor?.can().redo() ?? false,
  });

  return (
    <MenubarItem
      disabled={!canRedo}
      onClick={() => editor?.chain().focus().redo().run()}
      aria-label={canRedo ? '恢复上一步操作' : '无法恢复'}
    >
      <Redo2  />
      恢复
      <MenubarShortcut>⌘Y</MenubarShortcut>
    </MenubarItem>
  );
}
