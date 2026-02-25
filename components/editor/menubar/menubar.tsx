/**
 * EditorMenubar - Main menubar component for the Tiptap editor
 * 
 * This component combines all menu components (File, Edit, View, AI, Help)
 * and provides the main menubar interface for the editor.
 * 
 * Features:
 * - Wraps all menus in MenubarProvider for state management
 * - Handles null editor prop gracefully
 * - Uses shadcn/ui Menubar component
 * - Supports keyboard navigation and shortcuts
 * - Responsive design with mobile hamburger menu
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 8.1, 8.2
 */

'use client';

import { Menu } from 'lucide-react';
import React, { useMemo, useState, useCallback } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menubar } from '@/components/ui/menubar';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import type { EditorMenubarProps } from './types';

import { AIMenu } from './menus/ai-menu';
import { FileMenu } from './menus/file-menu';
import { EditMenu } from './menus/edit-menu';
import { ViewMenu } from './menus/view-menu';
import { HelpMenu } from './menus/help-menu';

interface ExtendedEditorMenubarProps extends EditorMenubarProps {
  filename?: string;
}

/**
 * EditorMenubar component
 * 
 * Main menubar container that renders all menu items horizontally
 * at the top of the editor on desktop, and as a hamburger menu on mobile.
 * 
 * @param editor - Tiptap editor instance (can be null)
 * @param className - Optional CSS class name for styling
 * 
 * Requirements:
 * - 6.1: Uses shadcn/ui Menubar component
 * - 6.2: Displays all menu items horizontally at the top
 * - 6.3: Provides visual feedback on hover
 * - 6.4: Shows dropdown menu on click
 * - 6.5: Auto-closes menu on outside click
 * - 6.6: Supports keyboard navigation
 * - 8.1: Adjusts layout for screens < 768px
 * - 8.2: Hamburger menu on mobile devices
 */
function EditorMenubarComponent({ editor, filename, className }: ExtendedEditorMenubarProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Handle null editor gracefully
  // If editor is null, still render the menubar but some functionality may be limited
  // Memoize this check to avoid recalculation
  useMemo(() => {
    if (!editor) {
      console.warn('EditorMenubar: editor instance is null. Some functionality may be limited.');
    }
  }, [editor]);

  // Memoize the open change handler
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <>
      {/* Desktop Menubar - Hidden on mobile (< 768px) */}
      {/* Requirements: 8.1 - Responsive layout adjustment */}
      <Menubar 
        className={cn(
          'border-b hidden md:flex relative',
          'transition-colors duration-200',
          'bg-background',
          className
        )}
        role="menubar"
        aria-label="编辑器主菜单栏"
      >
        {/* File Menu - Requirements: 1.1-1.7 */}
        <FileMenu editor={editor} />
        
        {/* Edit Menu - Requirements: 2.1-2.8 */}
        <EditMenu editor={editor} />
        
        {/* View Menu - Requirements: 3.1-3.6 */}
        <ViewMenu editor={editor} />
        
        {/* AI Menu - Requirements: 4.1-4.6 */}
        <AIMenu editor={editor} />
        
        {/* Help Menu - Requirements: 5.1-5.4 */}
        <HelpMenu editor={editor} />

        {/* Centered filename - VSCode style */}
        {filename && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-sm font-medium text-foreground/80">
              {filename}
            </span>
          </div>
        )}
      </Menubar>

      {/* Mobile Hamburger Menu - Shown only on mobile (< 768px) */}
      {/* Requirements: 8.1, 8.2 - Mobile adaptation with hamburger menu */}
      <div 
        className={cn(
          'border-b flex md:hidden items-center px-2 py-1.5 justify-between',
          'transition-colors duration-200',
          'bg-background',
          className
        )}
        role="navigation"
        aria-label="移动端菜单导航"
      >
        <div className="flex items-center">
          <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                  'h-7 w-7',
                  'transition-all duration-200',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
                aria-label="打开菜单"
                aria-expanded={isOpen}
                aria-haspopup="menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className={cn(
                'w-56',
                'animate-in fade-in-0 zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
              )}
              role="menu"
              aria-label="编辑器菜单选项"
            >
              <DropdownMenuLabel>编辑器菜单</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Mobile menu items render as nested dropdowns */}
              <div className="space-y-1">
                <FileMenu editor={editor} mobile />
                <EditMenu editor={editor} mobile />
                <ViewMenu editor={editor} mobile />
                <AIMenu editor={editor} mobile />
                <HelpMenu editor={editor} mobile />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <span className="ml-2 text-sm font-medium text-foreground" aria-hidden="true">菜单</span>
        </div>

        {/* Centered filename on mobile */}
        {filename && (
          <span className="text-sm font-medium text-foreground/80 truncate max-w-[50%]">
            {filename}
          </span>
        )}
      </div>
    </>
  );
}

/**
 * Memoized EditorMenubar component to prevent unnecessary re-renders
 */
export const EditorMenubar = React.memo(EditorMenubarComponent);

/**
 * Export alias for backward compatibility
 * The editor component imports this as MenuBar
 */
export { EditorMenubar as MenuBar };
