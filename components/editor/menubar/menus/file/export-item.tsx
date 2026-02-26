'use client';

import { useCallback } from 'react';
import { Download, FileText, FileType, FileCode } from 'lucide-react';

import {
  MenubarSub,
  MenubarItem,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@/components/ui/menubar';

import type { ImportExportFormat } from '../../types';

export function ExportItem() {
  const handleExport = useCallback((format: ImportExportFormat) => console.log(`Export ${format}`), []);
  return (
    <MenubarSub>
      <MenubarSubTrigger aria-label="导出文档">
        <Download  />
        导出
      </MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem onClick={() => handleExport('md')}>
          <FileCode  />
          Markdown (.md)
        </MenubarItem>
        <MenubarItem onClick={() => handleExport('pdf')}>
          <FileType  />
          PDF (.pdf)
        </MenubarItem>
        <MenubarItem onClick={() => handleExport('docx')}>
          <FileText  />
          DOCX (.docx)
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  );
}
