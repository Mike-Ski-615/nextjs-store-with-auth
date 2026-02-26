'use client';

import { History } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';
import { useMenubarState } from '@/components/editor/menubar/menubar-context';

export function VersionHistoryItem() {
  const { actions } = useMenubarState();

  return (
    <MenubarItem
      aria-label="查看版本历史"
      onSelect={() => actions.setVersionHistoryOpen(true)}
    >
      <History />
      版本历史
    </MenubarItem>
  );
}
