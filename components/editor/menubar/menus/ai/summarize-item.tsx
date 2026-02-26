'use client';

import { useCallback } from 'react';
import { FileSearch } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function SummarizeItem() {
  const handle = useCallback(() => console.log('AI action: summarize'), []);
  return (
    <MenubarItem onClick={handle} aria-label="AI 文本摘要">
      <FileSearch  />
      文本摘要
    </MenubarItem>
  );
}
