'use client';

import { useCallback } from 'react';
import { AlignLeft } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function AutoFormatItem() {
  const handle = useCallback(() => console.log('AI action: auto-format'), []);
  return (
    <MenubarItem onClick={handle} aria-label="AI 自动排版">
      <AlignLeft  />
      自动排版
    </MenubarItem>
  );
}
