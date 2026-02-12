"use client";

import { Editor } from "@tiptap/react";

interface CharacterCountProps {
  editor: Editor;
}

export function CharacterCount({ editor }: CharacterCountProps) {
  const characters = editor.storage.characterCount.characters();
  const words = editor.storage.characterCount.words();

  return (
    <div className="flex items-center gap-4 px-4 py-2 text-sm text-muted-foreground border-t">
      <div className="flex items-center gap-1">
        <span className="font-medium">字符:</span>
        <span>{characters.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-medium">单词:</span>
        <span>{words.toLocaleString()}</span>
      </div>
    </div>
  );
}
