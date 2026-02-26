'use client';

import React, { useState, useContext, useCallback, createContext } from 'react';

import type { MenubarState, MenubarContextValue } from './types';

const MenubarContext = createContext<MenubarContextValue | null>(null);

export function MenubarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MenubarState>({
    isToolbarVisible: true,
    isSidebarVisible: false,
    isAIPanelVisible: false,
    isVersionHistoryOpen: false,
  });

  const toggleToolbar = useCallback(() => {
    setState(prev => ({ ...prev, isToolbarVisible: !prev.isToolbarVisible }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isSidebarVisible: !prev.isSidebarVisible }));
  }, []);

  const toggleAIPanel = useCallback(() => {
    setState(prev => ({ ...prev, isAIPanelVisible: !prev.isAIPanelVisible }));
  }, []);

  const setVersionHistoryOpen = useCallback((isVersionHistoryOpen: boolean) => {
    setState(prev => ({ ...prev, isVersionHistoryOpen }));
  }, []);

  const contextValue: MenubarContextValue = {
    state,
    actions: { toggleToolbar, toggleSidebar, toggleAIPanel, setVersionHistoryOpen },
  };

  return (
    <MenubarContext.Provider value={contextValue}>
      {children}
    </MenubarContext.Provider>
  );
}

export function useMenubarState(): MenubarContextValue {
  const context = useContext(MenubarContext);
  if (!context) {
    throw new Error('useMenubarState must be used within MenubarProvider.');
  }
  return context;
}
