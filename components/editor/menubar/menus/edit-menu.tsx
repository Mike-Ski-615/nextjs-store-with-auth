'use client';

import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
} from '@/components/ui/menubar';

import type { MenuComponentProps } from '../types';
import {
  UndoItem,
  RedoItem,
  CutItem,
  CopyItem,
  PasteItem,
  FindItem,
  ReplaceItem,
} from './edit';

export function EditMenu({ editor }: MenuComponentProps) {
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="编辑菜单">编辑</MenubarTrigger>
      <MenubarContent>
        <UndoItem editor={editor} />
        <RedoItem editor={editor} />
        <MenubarSeparator />
        <CutItem editor={editor} />
        <CopyItem editor={editor} />
        <PasteItem editor={editor} />
        <MenubarSeparator />
        <FindItem />
        <ReplaceItem />
      </MenubarContent>
    </MenubarMenu>
  );
}
