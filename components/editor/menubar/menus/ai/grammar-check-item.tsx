'use client';

import { useCallback } from 'react';
import { SpellCheck } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function GrammarCheckItem() {
  const handle = useCallback(() => console.log('AI action: grammar-check'), []);
  return (
    <MenubarItem onClick={handle} aria-label="AI 语法和拼写检查">
      <SpellCheck  />
      语法/拼写检查
    </MenubarItem>
  );
}
