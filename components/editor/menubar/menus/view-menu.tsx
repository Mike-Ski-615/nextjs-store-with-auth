'use client';

import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
} from '@/components/ui/menubar';

import {
  ToolbarItem,
  SidebarItem,
  AIPanelItem,
  FullscreenItem,
  ThemeItem,
} from './view';

export function ViewMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="视图菜单">视图</MenubarTrigger>
      <MenubarContent>
        <ToolbarItem />
        <SidebarItem />
        <AIPanelItem />
        <MenubarSeparator />
        <FullscreenItem />
        <MenubarSeparator />
        <ThemeItem />
      </MenubarContent>
    </MenubarMenu>
  );
}
