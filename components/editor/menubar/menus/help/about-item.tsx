'use client';

import { useCallback } from 'react';
import { Info } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function AboutItem() {
  const handle = useCallback(() => console.log('Open about dialog'), []);
  return (
    <MenubarItem onClick={handle} aria-label="关于编辑器">
      <Info  />
      关于
    </MenubarItem>
  );
}
