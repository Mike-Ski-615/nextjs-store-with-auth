'use client';

import { useCallback } from 'react';
import { Command } from 'lucide-react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

export function ShowCommandsItem() {
  const handle = useCallback(() => console.log('Show all commands'), []);
  return (
    <MenubarItem onClick={handle} aria-label="显示所有命令">
      <Command  />
      显示所有命令
      <MenubarShortcut>⌘K</MenubarShortcut>
    </MenubarItem>
  );
}
