/**
 * SettingsDialog - Editor settings dialog component
 * 
 * Provides settings for:
 * - Auto-save toggle
 * - Future settings can be added here
 */

'use client';

import React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import { useMenubarState } from './menubar-context';

export function SettingsDialog() {
  const { state, actions } = useMenubarState();

  return (
    <Dialog open={state.isSettingsOpen} onOpenChange={(open) => {
      if (!open) {
        actions.closeSettings();
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑器设置</DialogTitle>
          <DialogDescription>
            配置编辑器的行为和偏好设置
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Auto-save setting */}
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="auto-save" className="text-sm font-medium">
                自动保存
              </Label>
              <p className="text-sm text-muted-foreground">
                启用后，文档将在编辑时自动保存
              </p>
            </div>
            <Switch
              id="auto-save"
              checked={state.autoSave}
              onCheckedChange={actions.setAutoSave}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
