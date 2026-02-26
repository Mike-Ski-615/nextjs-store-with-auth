'use client';

import { useCallback } from 'react';
import { Upload, FileText, FileType, FileCode } from 'lucide-react';

import {
  MenubarSub,
  MenubarItem,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@/components/ui/menubar';

import type { ImportExportFormat } from '../../types';

export function ImportItem() {
  const handleImport = useCallback((format: ImportExportFormat) => console.log(`Import ${format}`), []);
  return (
    <MenubarSub>
      <MenubarSubTrigger aria-label="导入文档">
        <Upload  />
        导入
      </MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem onClick={() => handleImport('md')}>
          <FileCode  />
          Markdown (.md)
        </MenubarItem>
        <MenubarItem onClick={() => handleImport('pdf')}>
          <FileType  />
          PDF (.pdf)
        </MenubarItem>
        <MenubarItem onClick={() => handleImport('docx')}>
          <FileText  />
          DOCX (.docx)
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  );
}
