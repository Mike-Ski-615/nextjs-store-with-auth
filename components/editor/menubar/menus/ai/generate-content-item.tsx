'use client';

import { useCallback } from 'react';
import { Sparkles } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function GenerateContentItem() {
  const handle = useCallback(() => console.log('AI action: generate-content'), []);
  return (
    <MenubarItem onClick={handle} aria-label="AI 内容生成">
      <Sparkles  />
      内容生成
    </MenubarItem>
  );
}
