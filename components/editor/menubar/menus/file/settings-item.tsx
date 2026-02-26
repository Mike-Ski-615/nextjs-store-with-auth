'use client';

import { Settings } from 'lucide-react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

export function SettingsItem() {
  return (
    <MenubarItem aria-label="打开设置" disabled>
      <Settings className="mr-2 h-4 w-4" />
      设置
      <MenubarShortcut>⌘,</MenubarShortcut>
    </MenubarItem>
  );
}
