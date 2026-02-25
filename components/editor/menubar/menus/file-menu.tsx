/**
 * FileMenu - File management menu component
 * 
 * Provides document management functionality including:
 * - Save document (with dirty state indicator)
 * - New document creation
 * - Import from various formats (Markdown, PDF, DOCX)
 * - Export to various formats (Markdown, PDF, DOCX)
 * - Settings, Share, and Exit actions
 * 
 * Supports both desktop menubar and mobile dropdown modes.
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 8.1, 8.2
 */

'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { cn } from '@/lib/utils';
import { useSaveStatus } from '@/hooks/use-save';
import {
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import {
  MenubarSub,
  MenubarMenu,
  MenubarItem,
  MenubarTrigger,
  MenubarContent,
  MenubarShortcut,
  MenubarSeparator,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@/components/ui/menubar';

import type { MenuComponentProps, ImportExportFormat } from '../types';

import { SettingsDialog } from '../settings-dialog';
import { useMenubarState } from '../menubar-context';


/**
 * FileMenu component
 * 
 * @param editor - Tiptap editor instance (can be null)
 * @param mobile - Whether rendering in mobile mode
 */
function FileMenuComponent({ editor, mobile }: MenuComponentProps) {
  const { state, actions } = useMenubarState();
  const { save } = useSaveStatus();
  const router = useRouter();

  /**
   * Handle new document creation
   * Requirements: 1.2
   */
  const handleNew = useCallback(() => {
    // Trigger new document event (UI interaction only, no backend logic)
    console.log('New document');
  }, []);

  /**
   * Handle document import
   * Requirements: 1.3
   * 
   * @param format - Import format (md, pdf, docx)
   */
  const handleImport = useCallback((format: ImportExportFormat) => {
    // Trigger import event (UI interaction only, no backend logic)
    console.log(`Import ${format}`);
  }, []);

  /**
   * Handle document export
   * Requirements: 1.4
   * 
   * @param format - Export format (md, pdf, docx)
   */
  const handleExport = useCallback((format: ImportExportFormat) => {
    // Trigger export event (UI interaction only, no backend logic)
    console.log(`Export ${format}`);
  }, []);

  /**
   * Handle settings dialog
   * Requirements: 1.5
   */
  const handleSettings = useCallback(() => {
    actions.openSettings();
  }, [actions]);

  /**
   * Handle share action
   * Requirements: 1.6
   */
  const handleShare = useCallback(() => {
    // Trigger share action event (UI interaction only)
    console.log('Share document');
  }, []);

  /**
   * Handle exit action
   * Requirements: 1.7
   */
  const handleExit = useCallback(() => {
    router.push('/documents');
  }, [router]);

  // Mobile mode - render as dropdown menu items
  // Requirements: 8.1, 8.2
  if (mobile) {
    return (
      <>
        <SettingsDialog />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>文件</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem 
              onClick={save}
              disabled={!state.isDirty}
              className={cn(!state.isDirty && 'text-muted-foreground')}
            >
              保存 <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleNew}>
              新建 <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>导入</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleImport('md')}>
                  Markdown (.md)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleImport('pdf')}>
                  PDF (.pdf)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleImport('docx')}>
                  DOCX (.docx)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>导出</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleExport('md')}>
                  Markdown (.md)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  PDF (.pdf)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('docx')}>
                  DOCX (.docx)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleSettings}>
              设置 <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleShare}>
              分享
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleExit}>
              退出
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </>
    );
  }

  // Desktop mode - render as menubar menu
  return (
    <>
      <SettingsDialog />
      <MenubarMenu>
        <MenubarTrigger aria-label="文件菜单">文件</MenubarTrigger>
        <MenubarContent>
          {/* Save Document */}
          <MenubarItem 
            onClick={save} 
            disabled={!state.isDirty}
            className={cn(!state.isDirty && 'text-muted-foreground')}
            aria-label="保存文档"
          >
            保存 <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          
          <MenubarSeparator />
          
          {/* New Document - Requirement 1.2 */}
          <MenubarItem onClick={handleNew} aria-label="创建新文档">
            新建 <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
        
        <MenubarSeparator />
        
        {/* Import Submenu - Requirement 1.3 */}
        <MenubarSub>
          <MenubarSubTrigger aria-label="导入文档">导入</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem onClick={() => handleImport('md')} aria-label="导入 Markdown 文件">
              Markdown (.md)
            </MenubarItem>
            <MenubarItem onClick={() => handleImport('pdf')} aria-label="导入 PDF 文件">
              PDF (.pdf)
            </MenubarItem>
            <MenubarItem onClick={() => handleImport('docx')} aria-label="导入 DOCX 文件">
              DOCX (.docx)
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        
        {/* Export Submenu - Requirement 1.4 */}
        <MenubarSub>
          <MenubarSubTrigger aria-label="导出文档">导出</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem onClick={() => handleExport('md')} aria-label="导出为 Markdown 文件">
              Markdown (.md)
            </MenubarItem>
            <MenubarItem onClick={() => handleExport('pdf')} aria-label="导出为 PDF 文件">
              PDF (.pdf)
            </MenubarItem>
            <MenubarItem onClick={() => handleExport('docx')} aria-label="导出为 DOCX 文件">
              DOCX (.docx)
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        
        <MenubarSeparator />
        
        {/* Settings - Requirement 1.5 */}
        <MenubarItem onClick={handleSettings} aria-label="打开设置">
          设置 <MenubarShortcut>⌘,</MenubarShortcut>
        </MenubarItem>
        
        {/* Share - Requirement 1.6 */}
        <MenubarItem onClick={handleShare} aria-label="分享文档">
          分享
        </MenubarItem>
        
        <MenubarSeparator />
        
        {/* Exit - Requirement 1.7 */}
        <MenubarItem onClick={handleExit} aria-label="退出编辑器">
          退出
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    </>
  );
}

/**
 * Memoized FileMenu component to prevent unnecessary re-renders
 */
export const FileMenu = React.memo(FileMenuComponent);
