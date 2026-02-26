'use client';

import { Bot } from 'lucide-react';

import { MenubarCheckboxItem } from '@/components/ui/menubar';

import { useMenubarState } from '../../menubar-context';

export function AIPanelItem() {
  const { state, actions } = useMenubarState();
  return (
    <MenubarCheckboxItem
      checked={state.isAIPanelVisible}
      onCheckedChange={actions.toggleAIPanel}
      aria-label={state.isAIPanelVisible ? '隐藏 AI 对话框' : '显示 AI 对话框'}
    >
      <Bot className="mr-2 h-4 w-4" />
      AI 对话框
    </MenubarCheckboxItem>
  );
}
