'use client';

import { useCallback } from 'react';
import { BookOpen } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function DocumentationItem() {
  const handle = useCallback(() => console.log('Open documentation'), []);
  return (
    <MenubarItem onClick={handle} aria-label="打开文档">
      <BookOpen  />
      文档
    </MenubarItem>
  );
}
