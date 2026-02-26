'use client';

import { useSyncExternalStore } from 'react';
import { Maximize, Minimize } from 'lucide-react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';

export function FullscreenItem() {
  const isFullscreen = useSyncExternalStore(
    (cb) => {
      document.addEventListener('fullscreenchange', cb);
      return () => document.removeEventListener('fullscreenchange', cb);
    },
    () => !!document.fullscreenElement,
    () => false,
  );

  if (!document.fullscreenEnabled) return null;

  return (
    <MenubarItem
      onClick={() => (isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()).catch(console.error)}
      aria-label={isFullscreen ? '退出全屏' : '进入全屏'}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
      {isFullscreen ? "退出全屏" : "全屏"}
      <MenubarShortcut>F11</MenubarShortcut>
    </MenubarItem>
  );
}
