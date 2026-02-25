/**
 * ViewMenu - View control menu component
 * 
 * Provides interface display control functionality including:
 * - Toggle toolbar visibility
 * - Toggle sidebar visibility
 * - Toggle AI panel visibility
 * - Toggle fullscreen mode
 * - Toggle theme (light/dark)
 * 
 * Uses MenubarCheckboxItem for toggle functionality and integrates
 * with useMenubarState hook for state management.
 * 
 * Supports both desktop menubar and mobile dropdown modes.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 7.2, 8.1, 8.2
 */

'use client';

import React, { useMemo } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  MenubarMenu,
  MenubarItem,
  MenubarTrigger,
  MenubarContent,
  MenubarShortcut,
  MenubarSeparator,
  MenubarCheckboxItem,
} from '@/components/ui/menubar';
import {
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

import type { MenuComponentProps } from '../types';

import { useMenubarState } from '../menubar-context';


/**
 * ViewMenu component
 * 
 * @param editor - Tiptap editor instance (can be null)
 * @param mobile - Whether rendering in mobile mode
 */
function ViewMenuComponent({ editor, mobile }: MenuComponentProps) {
  // Access menubar state and actions
  const { state, actions } = useMenubarState();

  // Check if Fullscreen API is supported - memoize to avoid recalculation
  const supportsFullscreen = useMemo(
    () => typeof document !== 'undefined' && document.fullscreenEnabled,
    []
  );

  // Mobile mode - render as dropdown menu items
  // Requirements: 8.1, 8.2
  if (mobile) {
    return (
      <>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>视图</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={state.isToolbarVisible}
              onCheckedChange={actions.toggleToolbar}
            >
              显示工具栏
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem
              checked={state.isSidebarVisible}
              onCheckedChange={actions.toggleSidebar}
            >
              显示辅助栏
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem
              checked={state.isAIPanelVisible}
              onCheckedChange={actions.toggleAIPanel}
            >
              AI 对话框
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              disabled={!supportsFullscreen}
              onClick={actions.toggleFullscreen}
            >
              全屏 <DropdownMenuShortcut>F11</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={actions.toggleTheme}>
              切换主题 <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </>
    );
  }

  // Desktop mode - render as menubar menu
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="视图菜单">视图</MenubarTrigger>
      <MenubarContent>
        {/* Toggle Toolbar - Requirements: 3.2, 7.2 */}
        <MenubarCheckboxItem
          checked={state.isToolbarVisible}
          onCheckedChange={actions.toggleToolbar}
          aria-label={state.isToolbarVisible ? "隐藏工具栏" : "显示工具栏"}
          aria-checked={state.isToolbarVisible}
        >
          显示工具栏
        </MenubarCheckboxItem>
        
        {/* Toggle Sidebar - Requirements: 3.3, 7.2 */}
        <MenubarCheckboxItem
          checked={state.isSidebarVisible}
          onCheckedChange={actions.toggleSidebar}
          aria-label={state.isSidebarVisible ? "隐藏辅助栏" : "显示辅助栏"}
          aria-checked={state.isSidebarVisible}
        >
          显示辅助栏
        </MenubarCheckboxItem>
        
        {/* Toggle AI Panel - Requirements: 3.4, 7.2 */}
        <MenubarCheckboxItem
          checked={state.isAIPanelVisible}
          onCheckedChange={actions.toggleAIPanel}
          aria-label={state.isAIPanelVisible ? "隐藏 AI 对话框" : "显示 AI 对话框"}
          aria-checked={state.isAIPanelVisible}
        >
          AI 对话框
        </MenubarCheckboxItem>
        
        <MenubarSeparator />
        
        {/* Toggle Fullscreen - Requirements: 3.5, 7.2 */}
        {/* Wrap in tooltip when fullscreen is not supported */}
        {!supportsFullscreen ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenubarItem 
                  disabled={true}
                  onClick={actions.toggleFullscreen}
                  aria-label="全屏模式（不支持）"
                  aria-disabled="true"
                >
                  全屏 <MenubarShortcut>F11</MenubarShortcut>
                </MenubarItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>您的浏览器不支持全屏 API</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <MenubarItem 
            disabled={false}
            onClick={actions.toggleFullscreen}
            aria-label={state.isFullscreen ? "退出全屏" : "进入全屏"}
          >
            全屏 <MenubarShortcut>F11</MenubarShortcut>
          </MenubarItem>
        )}
        
        <MenubarSeparator />
        
        {/* Toggle Theme - Requirements: 3.6, 7.2 */}
        <MenubarItem 
          onClick={actions.toggleTheme}
          aria-label={state.theme === 'light' ? "切换到深色主题" : "切换到浅色主题"}
        >
          切换主题 <MenubarShortcut>⌘D</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

/**
 * Memoized ViewMenu component to prevent unnecessary re-renders
 */
export const ViewMenu = React.memo(ViewMenuComponent);
