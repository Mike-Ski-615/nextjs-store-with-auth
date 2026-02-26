'use client';

import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
} from '@/components/ui/menubar';

import {
  ShowCommandsItem,
  DocumentationItem,
  AboutItem,
} from './help';

export function HelpMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="帮助菜单">帮助</MenubarTrigger>
      <MenubarContent>
        <ShowCommandsItem />
        <MenubarSeparator />
        <DocumentationItem />
        <AboutItem />
      </MenubarContent>
    </MenubarMenu>
  );
}
