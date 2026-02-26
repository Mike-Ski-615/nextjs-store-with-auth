'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { MenubarItem } from '@/components/ui/menubar';

export function ExitItem() {
  const router = useRouter();
  const handleExit = useCallback(() => router.push('/documents'), [router]);
  return (
    <MenubarItem variant='destructive' onClick={handleExit} aria-label="退出编辑器">
      <LogOut  />
      退出
    </MenubarItem>
  );
}
