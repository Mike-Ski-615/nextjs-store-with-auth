import type { Editor } from '@tiptap/react';

export interface MenubarState {
  isToolbarVisible: boolean;
  isSidebarVisible: boolean;
  isAIPanelVisible: boolean;
  isVersionHistoryOpen: boolean;
}

export interface MenubarContextValue {
  state: MenubarState;
  actions: {
    toggleToolbar: () => void;
    toggleSidebar: () => void;
    toggleAIPanel: () => void;
    setVersionHistoryOpen: (open: boolean) => void;
  };
}

export interface EditorMenubarProps {
  editor: Editor | null;
  className?: string;
}

export interface MenuComponentProps {
  editor: Editor | null;
}

export type ImportExportFormat = 'md' | 'pdf' | 'docx';

export type AIActionType =
  | 'smart-writing'
  | 'grammar-check'
  | 'summarize'
  | 'auto-format'
  | 'generate-content';
