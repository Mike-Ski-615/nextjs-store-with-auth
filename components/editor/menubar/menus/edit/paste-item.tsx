'use client';

import { useCallback } from 'react';
import { Clipboard } from 'lucide-react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

import type { MenuComponentProps } from '../../types';

export function PasteItem({ editor }: MenuComponentProps) {
  const handlePaste = useCallback(async () => {
    if (!navigator.clipboard || !editor) return;
    const text = await navigator.clipboard.readText();
    if (text) editor.chain().focus().insertContent(text).run();
  }, [editor]);

  return (
    <MenubarItem onClick={handlePaste} aria-label="粘贴剪贴板内容">
      <Clipboard  />
      粘贴
      <MenubarShortcut>⌘V</MenubarShortcut>
    </MenubarItem>
  );
}
