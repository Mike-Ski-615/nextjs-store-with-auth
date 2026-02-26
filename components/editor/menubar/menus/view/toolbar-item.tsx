'use client';

import { PanelTop } from 'lucide-react';

import { MenubarCheckboxItem } from '@/components/ui/menubar';

import { useMenubarState } from '../../menubar-context';

export function ToolbarItem() {
  const { state, actions } = useMenubarState();
  return (
    <MenubarCheckboxItem
      checked={state.isToolbarVisible}
      onCheckedChange={actions.toggleToolbar}
      aria-label={state.isToolbarVisible ? '隐藏工具栏' : '显示工具栏'}
    >
      <PanelTop className="mr-2 h-4 w-4"/>
      显示工具栏
    </MenubarCheckboxItem>
  );
}
