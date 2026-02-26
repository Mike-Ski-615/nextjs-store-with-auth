'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { MenubarItem } from '@/components/ui/menubar';

export function ThemeItem() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <MenubarItem
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? '切换到浅色主题' : '切换到深色主题'}
    >
      {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
      切换主题
    </MenubarItem>
  );
}
