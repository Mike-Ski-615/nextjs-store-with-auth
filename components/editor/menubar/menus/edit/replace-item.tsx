'use client';

import { useCallback } from 'react';
import { Replace } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function ReplaceItem() {
  const handleReplace = useCallback(() => console.log('Open replace dialog'), []);
  return (
    <MenubarItem onClick={handleReplace} aria-label="查找并替换文本">
      <Replace  />
      替换
    </MenubarItem>
  );
}
