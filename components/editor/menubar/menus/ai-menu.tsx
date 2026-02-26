'use client';

import type { Editor } from '@tiptap/react';

import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSeparator,
} from '@/components/ui/menubar';

import {
  AskAiItem,
  SmartWritingItem,
  GrammarCheckItem,
  SummarizeItem,
  AutoFormatItem,
  GenerateContentItem,
} from './ai';

export function AIMenu({ editor }: { editor: Editor }) {
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="AI 菜单">AI</MenubarTrigger>
      <MenubarContent>
        <AskAiItem editor={editor} />
        <MenubarSeparator />
        <SmartWritingItem />
        <GrammarCheckItem />
        <SummarizeItem />
        <AutoFormatItem />
        <GenerateContentItem />
      </MenubarContent>
    </MenubarMenu>
  );
}
