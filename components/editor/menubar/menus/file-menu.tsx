'use client';

import type { Editor } from '@tiptap/react';

import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
} from '@/components/ui/menubar';

import {
  SaveItem,
  NewItem,
  ImportItem,
  ExportItem,
  SettingsItem,
  ShareItem,
  VersionHistoryItem,
  ExitItem,
} from './file';

export function FileMenu({ editor }: { editor: Editor }) {
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="文件菜单">文件</MenubarTrigger>
      <MenubarContent>
        <SaveItem />
        <MenubarSeparator />
        <NewItem />
        <MenubarSeparator />
        <ImportItem />
        <ExportItem />
        <MenubarSeparator />
        <VersionHistoryItem />
        <MenubarSeparator />
        <SettingsItem />
        <ShareItem />
        <MenubarSeparator />
        <ExitItem />
      </MenubarContent>
    </MenubarMenu>
  );
}
