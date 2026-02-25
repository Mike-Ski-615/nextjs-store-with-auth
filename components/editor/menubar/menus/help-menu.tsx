/**
 * HelpMenu - Help and documentation menu component
 * 
 * Provides access to:
 * - Command palette (show all commands)
 * - Documentation
 * - About dialog
 * 
 * Supports both desktop menubar and mobile dropdown modes.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 8.1, 8.2
 */

'use client';

import React, { useCallback } from 'react';

import {
  MenubarMenu,
  MenubarItem,
  MenubarTrigger,
  MenubarContent,
  MenubarShortcut,
  MenubarSeparator,
} from '@/components/ui/menubar';
import {
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';

import type { MenuComponentProps } from '../types';


/**
 * HelpMenu component
 * 
 * @param editor - Tiptap editor instance (can be null)
 * @param mobile - Whether rendering in mobile mode
 */
function HelpMenuComponent({ editor, mobile }: MenuComponentProps) {
  /**
   * Handle show all commands action
   * Requirements: 5.2
   */
  const handleShowCommands = useCallback(() => {
    // Trigger command palette event (UI interaction only, no backend logic)
    console.log('Show all commands');
  }, []);

  /**
   * Handle documentation action
   * Requirements: 5.3
   */
  const handleDocumentation = useCallback(() => {
    // Trigger documentation event (UI interaction only, no backend logic)
    console.log('Open documentation');
  }, []);

  /**
   * Handle about dialog action
   * Requirements: 5.4
   */
  const handleAbout = useCallback(() => {
    // Trigger about dialog event (UI interaction only, no backend logic)
    console.log('Open about dialog');
  }, []);

  // Mobile mode - render as dropdown menu items
  // Requirements: 8.1, 8.2
  if (mobile) {
    return (
      <>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>帮助</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={handleShowCommands}>
              显示所有命令 <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleDocumentation}>
              文档
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleAbout}>
              关于
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </>
    );
  }

  // Desktop mode - render as menubar menu
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="帮助菜单">帮助</MenubarTrigger>
      <MenubarContent>
        {/* Show All Commands - Requirement 5.2 */}
        <MenubarItem onClick={handleShowCommands} aria-label="显示所有命令">
          显示所有命令 <MenubarShortcut>⌘K</MenubarShortcut>
        </MenubarItem>
        
        <MenubarSeparator />
        
        {/* Documentation - Requirement 5.3 */}
        <MenubarItem onClick={handleDocumentation} aria-label="打开文档">
          文档
        </MenubarItem>
        
        {/* About - Requirement 5.4 */}
        <MenubarItem onClick={handleAbout} aria-label="关于编辑器">
          关于
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

/**
 * Memoized HelpMenu component to prevent unnecessary re-renders
 */
export const HelpMenu = React.memo(HelpMenuComponent);
