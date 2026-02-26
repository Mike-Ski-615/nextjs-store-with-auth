'use client';

import { useCallback } from 'react';
import { FilePlus } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function NewItem() {
  const handleNew = useCallback(() => console.log('New document'), []);
  return (
    <MenubarItem onClick={handleNew} aria-label="创建新文档">
      <FilePlus  />
      新建
    </MenubarItem>
  );
}
