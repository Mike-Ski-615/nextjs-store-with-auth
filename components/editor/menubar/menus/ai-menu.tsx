/**
 * AIMenu - AI assistance menu component
 * 
 * Provides AI-powered functionality including:
 * - Smart writing assistance
 * - Grammar and spelling check
 * - Text summarization
 * - Auto formatting
 * - Content generation
 * 
 * Supports both desktop menubar and mobile dropdown modes.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 8.1, 8.2
 */

'use client';

import React, { useCallback } from 'react';

import {
  MenubarMenu,
  MenubarItem,
  MenubarTrigger,
  MenubarContent,
} from '@/components/ui/menubar';
import {
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';

import type { AIActionType, MenuComponentProps } from '../types';


/**
 * AIMenu component
 * 
 * @param editor - Tiptap editor instance (can be null)
 * @param mobile - Whether rendering in mobile mode
 */
function AIMenuComponent({ editor, mobile }: MenuComponentProps) {
  /**
   * Handle AI action
   * 
   * @param action - AI action type
   */
  const handleAIAction = useCallback((action: AIActionType) => {
    // Trigger AI action event (UI interaction only, no backend logic)
    console.log(`AI action: ${action}`);
  }, []);

  // Mobile mode - render as dropdown menu items
  // Requirements: 8.1, 8.2
  if (mobile) {
    return (
      <>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>AI</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleAIAction('smart-writing')}>
              智能写作
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleAIAction('grammar-check')}>
              语法/拼写检查
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleAIAction('summarize')}>
              文本摘要
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleAIAction('auto-format')}>
              自动排版
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleAIAction('generate-content')}>
              内容生成
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </>
    );
  }

  // Desktop mode - render as menubar menu
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="AI 菜单">AI</MenubarTrigger>
      <MenubarContent>
        {/* Smart Writing - Requirement 4.2 */}
        <MenubarItem onClick={() => handleAIAction('smart-writing')} aria-label="AI 智能写作">
          智能写作
        </MenubarItem>
        
        {/* Grammar/Spelling Check - Requirement 4.3 */}
        <MenubarItem onClick={() => handleAIAction('grammar-check')} aria-label="AI 语法和拼写检查">
          语法/拼写检查
        </MenubarItem>
        
        {/* Text Summarization - Requirement 4.4 */}
        <MenubarItem onClick={() => handleAIAction('summarize')} aria-label="AI 文本摘要">
          文本摘要
        </MenubarItem>
        
        {/* Auto Formatting - Requirement 4.5 */}
        <MenubarItem onClick={() => handleAIAction('auto-format')} aria-label="AI 自动排版">
          自动排版
        </MenubarItem>
        
        {/* Content Generation - Requirement 4.6 */}
        <MenubarItem onClick={() => handleAIAction('generate-content')} aria-label="AI 内容生成">
          内容生成
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

/**
 * Memoized AIMenu component to prevent unnecessary re-renders
 */
export const AIMenu = React.memo(AIMenuComponent);
