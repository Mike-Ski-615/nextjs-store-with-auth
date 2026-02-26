'use client';

import { useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import { BotMessageSquare } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function AskAiItem({ editor }: { editor: Editor }) {
  const handle = useCallback(() => {
    editor.chain().focus().askAi().run();
  }, [editor]);

  return (
    <MenubarItem onClick={handle} aria-label="Ask AI 助手">
      <BotMessageSquare />
      Ask AI
    </MenubarItem>
  );
}
