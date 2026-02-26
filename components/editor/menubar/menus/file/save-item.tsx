'use client';

import { Save } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

export function SaveItem() {
  return (
    <MenubarItem
      disabled
      className={cn('text-muted-foreground')}
      aria-label="文档自动保存"
    >
      <Save />
      自动保存
      <MenubarShortcut>⌘S</MenubarShortcut>
    </MenubarItem>
  );
}
