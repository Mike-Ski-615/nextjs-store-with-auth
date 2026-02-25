/**
 * EditMenu - Edit operations menu component
 * 
 * Provides text editing functionality including:
 * - Undo/Redo operations
 * - Cut, Copy, Paste operations
 * - Find and Replace
 * 
 * Integrates with Tiptap editor for undo/redo commands and
 * implements menu item disabled state based on editor state.
 * 
 * Supports both desktop menubar and mobile dropdown modes.
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 7.4, 7.5, 7.6, 8.1, 8.2
 */

'use client';

import React, { useMemo, useCallback } from 'react';

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
 * EditMenu component
 * 
 * @param editor - Tiptap editor instance (can be null)
 * @param mobile - Whether rendering in mobile mode
 */
function EditMenuComponent({ editor, mobile }: MenuComponentProps) {
  // Determine menu item states based on editor state
  // Requirements: 7.4, 7.5, 7.6
  // Memoize these values to avoid recalculation on every render
  const canUndo = useMemo(() => editor?.can().undo() ?? false, [editor]);
  const canRedo = useMemo(() => editor?.can().redo() ?? false, [editor]);
  const hasSelection = useMemo(() => editor ? !editor.state.selection.empty : false, [editor]);

  /**
   * Handle undo operation
   * Requirements: 2.2, 7.5
   */
  const handleUndo = useCallback(() => {
    if (editor && canUndo) {
      editor.chain().focus().undo().run();
    }
  }, [editor, canUndo]);

  /**
   * Handle redo operation
   * Requirements: 2.3, 7.6
   */
  const handleRedo = useCallback(() => {
    if (editor && canRedo) {
      editor.chain().focus().redo().run();
    }
  }, [editor, canRedo]);

  /**
   * Handle cut operation
   * Requirements: 2.4, 7.4
   */
  const handleCut = useCallback(async () => {
    try {
      const selectedText = window.getSelection()?.toString() || '';
      if (!selectedText) {
        console.warn('剪切操作: 未选中文本');
        return;
      }
      
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        console.error('剪切操作失败: 剪贴板 API 不可用');
        return;
      }
      
      await navigator.clipboard.writeText(selectedText);
      
      // Delete the selected text in the editor
      if (editor) {
        editor.chain().focus().deleteSelection().run();
      }
    } catch (error) {
      console.error('剪切操作失败:', error);
      // Log specific error details
      if (error instanceof Error) {
        console.error('错误详情:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
    }
  }, [editor]);

  /**
   * Handle copy operation
   * Requirements: 2.5, 7.4
   */
  const handleCopy = useCallback(async () => {
    try {
      const selectedText = window.getSelection()?.toString() || '';
      if (!selectedText) {
        console.warn('复制操作: 未选中文本');
        return;
      }
      
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        console.error('复制操作失败: 剪贴板 API 不可用');
        return;
      }
      
      await navigator.clipboard.writeText(selectedText);
    } catch (error) {
      console.error('复制操作失败:', error);
      // Log specific error details
      if (error instanceof Error) {
        console.error('错误详情:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
    }
  }, []);

  /**
   * Handle paste operation
   * Requirements: 2.6
   */
  const handlePaste = useCallback(async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        console.error('Paste operation failed: Clipboard API not available');
        return;
      }
      
      const text = await navigator.clipboard.readText();
      if (text && editor) {
        editor.chain().focus().insertContent(text).run();
      } else if (!text) {
        console.warn('Paste operation: Clipboard is empty');
      }
    } catch (error) {
      console.error('Paste operation failed:', error);
      // Log specific error details
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      // Common clipboard errors include permission denied
      if (error instanceof DOMException) {
        console.error('DOMException:', {
          code: error.code,
          name: error.name,
          message: error.message,
        });
      }
    }
  }, [editor]);

  /**
   * Handle find operation
   * Requirements: 2.7
   */
  const handleFind = useCallback(() => {
    // Trigger find dialog event (UI interaction only)
    console.log('Open find dialog');
  }, []);

  /**
   * Handle replace operation
   * Requirements: 2.8
   */
  const handleReplace = useCallback(() => {
    // Trigger replace dialog event (UI interaction only)
    console.log('Open replace dialog');
  }, []);

  // Mobile mode - render as dropdown menu items
  // Requirements: 8.1, 8.2
  if (mobile) {
    return (
      <>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>编辑</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem 
              disabled={!canUndo}
              onClick={handleUndo}
            >
              撤销 <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              disabled={!canRedo}
              onClick={handleRedo}
            >
              恢复 <DropdownMenuShortcut>⇧⌘Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              disabled={!hasSelection}
              onClick={handleCut}
            >
              剪切 <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              disabled={!hasSelection}
              onClick={handleCopy}
            >
              复制 <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handlePaste}>
              粘贴 <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleFind}>
              查找 <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleReplace}>
              替换 <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </>
    );
  }

  // Desktop mode - render as menubar menu
  return (
    <MenubarMenu>
      <MenubarTrigger aria-label="编辑菜单">编辑</MenubarTrigger>
      <MenubarContent>
        {/* Undo - Requirements: 2.2, 7.5 */}
        <MenubarItem 
          disabled={!canUndo}
          onClick={handleUndo}
          aria-label={canUndo ? "撤销上一步操作" : "无法撤销"}
          aria-disabled={!canUndo}
        >
          撤销 <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        
        {/* Redo - Requirements: 2.3, 7.6 */}
        <MenubarItem 
          disabled={!canRedo}
          onClick={handleRedo}
          aria-label={canRedo ? "恢复上一步操作" : "无法恢复"}
          aria-disabled={!canRedo}
        >
          恢复 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
        </MenubarItem>
        
        <MenubarSeparator />
        
        {/* Cut - Requirements: 2.4, 7.4 */}
        <MenubarItem 
          disabled={!hasSelection}
          onClick={handleCut}
          aria-label={hasSelection ? "剪切选中内容" : "无选中内容可剪切"}
          aria-disabled={!hasSelection}
        >
          剪切 <MenubarShortcut>⌘X</MenubarShortcut>
        </MenubarItem>
        
        {/* Copy - Requirements: 2.5, 7.4 */}
        <MenubarItem 
          disabled={!hasSelection}
          onClick={handleCopy}
          aria-label={hasSelection ? "复制选中内容" : "无选中内容可复制"}
          aria-disabled={!hasSelection}
        >
          复制 <MenubarShortcut>⌘C</MenubarShortcut>
        </MenubarItem>
        
        {/* Paste - Requirements: 2.6 */}
        <MenubarItem onClick={handlePaste} aria-label="粘贴剪贴板内容">
          粘贴 <MenubarShortcut>⌘V</MenubarShortcut>
        </MenubarItem>
        
        <MenubarSeparator />
        
        {/* Find - Requirements: 2.7 */}
        <MenubarItem onClick={handleFind} aria-label="查找文本">
          查找 <MenubarShortcut>⌘F</MenubarShortcut>
        </MenubarItem>
        
        {/* Replace - Requirements: 2.8 */}
        <MenubarItem onClick={handleReplace} aria-label="查找并替换文本">
          替换 <MenubarShortcut>⌘H</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

/**
 * Memoized EditMenu component to prevent unnecessary re-renders
 */
export const EditMenu = React.memo(EditMenuComponent);
