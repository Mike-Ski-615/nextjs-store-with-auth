'use client';

import { useCallback } from 'react';
import { Search } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function FindItem() {
  const handleFind = useCallback(() => console.log('Open find dialog'), []);
  return (
    <MenubarItem onClick={handleFind} aria-label="查找文本">
      <Search  />
      查找
    </MenubarItem>
  );
}
