'use client';

import { useCallback } from 'react';
import { Pencil } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function SmartWritingItem() {
  const handle = useCallback(() => console.log('AI action: smart-writing'), []);
  return (
    <MenubarItem onClick={handle} aria-label="AI 智能写作">
      <Pencil  />
      智能写作
    </MenubarItem>
  );
}
