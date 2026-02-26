'use client';

import { useCallback } from 'react';
import { Share2 } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function ShareItem() {
  const handleShare = useCallback(() => console.log('Share document'), []);
  return (
    <MenubarItem onClick={handleShare} aria-label="分享文档">
      <Share2  />
      分享
    </MenubarItem>
  );
}
