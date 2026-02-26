'use client';

import { Menubar } from '@/components/ui/menubar';

import { FileMenu, EditMenu, ViewMenu, AIMenu, HelpMenu } from './menus';
import { Editor } from '@tiptap/react';


export function EditorMenubar({ editor }: { editor: Editor }) {
  return (
    <Menubar
      className='border-0 flex relative bg-background'
      aria-label="编辑器主菜单栏"
    >
      <FileMenu editor={editor} />
      <EditMenu editor={editor} />
      <ViewMenu />
      <AIMenu editor={editor} />
      <HelpMenu />
    </Menubar>
  );
}

export { EditorMenubar as MenuBar };
