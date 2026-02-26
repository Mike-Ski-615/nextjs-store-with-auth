'use client';

import { PanelLeft } from 'lucide-react';

import { MenubarCheckboxItem } from '@/components/ui/menubar';

import { useMenubarState } from '../../menubar-context';

export function SidebarItem() {
  const { state, actions } = useMenubarState();
  return (
    <MenubarCheckboxItem
      checked={state.isSidebarVisible}
      onCheckedChange={actions.toggleSidebar}
      aria-label={state.isSidebarVisible ? '隐藏辅助栏' : '显示辅助栏'}
    >
      <PanelLeft className="mr-2 h-4 w-4" />
      显示辅助栏
    </MenubarCheckboxItem>
  );
}
