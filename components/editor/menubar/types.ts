/**
 * Type definitions for the Editor Menubar component system
 */

import type { Editor } from '@tiptap/react';

/**
 * Global state for the menubar
 */
export interface MenubarState {
  // View states
  isToolbarVisible: boolean;      // Whether the toolbar is visible
  isSidebarVisible: boolean;      // Whether the sidebar is visible
  isAIPanelVisible: boolean;      // Whether the AI panel is visible
  isFullscreen: boolean;          // Whether in fullscreen mode
  theme: 'light' | 'dark';        // Current theme
  
  // Editor states
  canUndo: boolean;               // Whether undo is available
  canRedo: boolean;               // Whether redo is available
  hasSelection: boolean;          // Whether text is selected
  
  // Document states
  isDirty: boolean;               // Whether document has unsaved changes
  autoSave: boolean;              // Whether auto-save is enabled
  isSettingsOpen: boolean;        // Whether settings dialog is open
}

/**
 * Actions that can be performed through the menubar
 */
export type MenuAction = 
  // File menu actions
  | 'new-document'
  | 'import-md' | 'import-pdf' | 'import-docx'
  | 'export-md' | 'export-pdf' | 'export-docx'
  | 'settings' | 'share' | 'exit'
  // Edit menu actions
  | 'undo' | 'redo'
  | 'cut' | 'copy' | 'paste'
  | 'find' | 'replace'
  // View menu actions
  | 'toggle-toolbar' | 'toggle-sidebar' | 'toggle-ai-panel'
  | 'toggle-fullscreen' | 'toggle-theme'
  // AI menu actions
  | 'ai-smart-writing' | 'ai-grammar-check' | 'ai-summarize'
  | 'ai-auto-format' | 'ai-generate-content'
  // Help menu actions
  | 'show-commands' | 'documentation' | 'about';

/**
 * Context value for menubar state management
 */
export interface MenubarContextValue {
  state: MenubarState;
  actions: {
    toggleToolbar: () => void;
    toggleSidebar: () => void;
    toggleAIPanel: () => void;
    toggleFullscreen: () => void;
    toggleTheme: () => void;
    setDirty: (isDirty: boolean) => void;
    setAutoSave: (autoSave: boolean) => void;
    openSettings: () => void;
    closeSettings: () => void;
  };
}

/**
 * Props for the main EditorMenubar component
 */
export interface EditorMenubarProps {
  editor: Editor | null;
  className?: string;
}

/**
 * Props for individual menu components
 */
export interface MenuComponentProps {
  editor: Editor | null;
  mobile?: boolean; // Whether rendering in mobile mode
}

/**
 * Import/Export format types
 */
export type ImportExportFormat = 'md' | 'pdf' | 'docx';

/**
 * AI action types
 */
export type AIActionType = 
  | 'smart-writing'
  | 'grammar-check'
  | 'summarize'
  | 'auto-format'
  | 'generate-content';
