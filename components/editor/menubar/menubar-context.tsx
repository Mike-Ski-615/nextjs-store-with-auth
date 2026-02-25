/**
 * MenubarContext - Global state management for the editor menubar
 * 
 * This context provides state management for view toggles (toolbar, sidebar, AI panel, fullscreen, theme)
 * and makes the state accessible to all menu components through the useMenubarState hook.
 */

'use client';

import React, { useState, useContext, useCallback, createContext, useMemo } from 'react';
import { useTheme } from 'next-themes';

import type { MenubarState, MenubarContextValue } from './types';

/**
 * Context for menubar state management
 */
const MenubarContext = createContext<MenubarContextValue | null>(null);

/**
 * MenubarProvider - Provides menubar state to all child components
 * 
 * @param children - Child components that need access to menubar state
 */
export function MenubarProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();

  const [state, setState] = useState<MenubarState>({
    // View states - default values
    isToolbarVisible: true,
    isSidebarVisible: false,
    isAIPanelVisible: false,
    isFullscreen: false,
    theme: 'light',
    
    // Editor states - default values
    canUndo: false,
    canRedo: false,
    hasSelection: false,
    
    // Document states - default values
    isDirty: false,
    autoSave: false,
    isSettingsOpen: false,
  });

  // Derive the actual theme from next-themes, keeping menubar state in sync
  const currentTheme = useMemo<'light' | 'dark'>(
    () => (resolvedTheme === 'dark' ? 'dark' : 'light'),
    [resolvedTheme]
  );

  // Merge the real theme into state for consumers
  const derivedState = useMemo<MenubarState>(
    () => ({ ...state, theme: currentTheme }),
    [state, currentTheme]
  );

  /**
   * Toggle toolbar visibility
   * Requirements: 3.2, 7.2, 7.3
   */
  const toggleToolbar = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isToolbarVisible: !prevState.isToolbarVisible,
    }));
  }, []);

  /**
   * Toggle sidebar visibility
   * Requirements: 3.3, 7.2, 7.3
   */
  const toggleSidebar = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  }, []);

  /**
   * Toggle AI panel visibility
   * Requirements: 3.4, 7.2, 7.3
   */
  const toggleAIPanel = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isAIPanelVisible: !prevState.isAIPanelVisible,
    }));
  }, []);

  /**
   * Toggle fullscreen mode
   * Uses the Fullscreen API to enter/exit fullscreen
   * Requirements: 3.5, 7.2, 7.3
   */
  const toggleFullscreen = useCallback(() => {
    // Check if Fullscreen API is supported
    if (!document.fullscreenEnabled) {
      console.warn('Fullscreen API is not supported in this browser');
      return;
    }

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        document.documentElement.requestFullscreen().catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
        setState(prevState => ({
          ...prevState,
          isFullscreen: true,
        }));
      } else {
        // Exit fullscreen
        document.exitFullscreen().catch((err) => {
          console.error('Error attempting to exit fullscreen:', err);
        });
        setState(prevState => ({
          ...prevState,
          isFullscreen: false,
        }));
      }
    } catch (error) {
      console.error('Fullscreen toggle error:', error);
    }
  }, []);

  /**
   * Toggle theme between light and dark
   * Delegates to next-themes for actual theme switching
   * Requirements: 3.6, 7.2, 7.3
   */
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  /**
   * Set document dirty state (has unsaved changes)
   */
  const setDirty = useCallback((isDirty: boolean) => {
    setState(prevState => ({
      ...prevState,
      isDirty,
    }));
  }, []);

  /**
   * Set auto-save preference
   */
  const setAutoSave = useCallback((autoSave: boolean) => {
    setState(prevState => ({
      ...prevState,
      autoSave,
    }));
  }, []);

  /**
   * Open settings dialog
   */
  const openSettings = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isSettingsOpen: true,
    }));
  }, []);

  /**
   * Close settings dialog
   */
  const closeSettings = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isSettingsOpen: false,
    }));
  }, []);

  const contextValue: MenubarContextValue = {
    state: derivedState,
    actions: {
      toggleToolbar,
      toggleSidebar,
      toggleAIPanel,
      toggleFullscreen,
      toggleTheme,
      setDirty,
      setAutoSave,
      openSettings,
      closeSettings,
    },
  };

  return (
    <MenubarContext.Provider value={contextValue}>
      {children}
    </MenubarContext.Provider>
  );
}

/**
 * useMenubarState - Hook to access menubar state and actions
 * 
 * Must be used within a MenubarProvider component.
 * Throws an error if used outside of the provider.
 * 
 * @returns MenubarContextValue containing state and actions
 * @throws Error if used outside MenubarProvider
 * 
 * Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 7.2, 7.3
 */
export function useMenubarState(): MenubarContextValue {
  const context = useContext(MenubarContext);
  
  if (!context) {
    throw new Error(
      'useMenubarState must be used within MenubarProvider. ' +
      'Wrap your component tree with <MenubarProvider>.'
    );
  }
  
  return context;
}
