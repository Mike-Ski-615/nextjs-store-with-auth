"use client";

import { Table } from "lucide-react";
import { MenuButton } from "../../menu-button";
import { Editor, useEditorState } from "@tiptap/react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";

const COLUMNS = 7;
const ROWS = 5;

export function TablePopover({ editor }: { editor: Editor }) {
  const [gridSize, setGridSize] = useState({ cols: 1, rows: 1 });

  const isActive = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive("table"),
  });

  const isActiveCell = (rowIndex: number, colIndex: number) =>
    rowIndex < gridSize.rows && colIndex < gridSize.cols;

  const handleCellClick = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: gridSize.rows, cols: gridSize.cols, withHeaderRow: true })
      .run();
  };

  const grid = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-1">
          {Array.from({ length: COLUMNS }, (_, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className={cn(
                "w-6 h-6 border-2 rounded cursor-pointer transition-colors",
                isActiveCell(rowIndex, colIndex)
                  ? "bg-primary border-primary"
                  : "bg-background border-border hover:border-primary/50"
              )}
              onMouseEnter={() =>
                setGridSize({ cols: colIndex + 1, rows: rowIndex + 1 })
              }
              onClick={handleCellClick}
            />
          ))}
        </div>
      )),
    [gridSize]
  );

  return (
    <MenuButton type="popover" icon={Table} text="表格" pressed={isActive}>
      <PopoverClose asChild>
        <div className="p-2">
          <div className="flex flex-col gap-1">{grid}</div>
          <div className="text-sm text-muted-foreground mt-2 text-center">
            {gridSize.rows} × {gridSize.cols}
          </div>
        </div>
      </PopoverClose>
    </MenuButton>
  );
}
