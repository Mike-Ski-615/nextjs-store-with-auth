import { Editor, useEditorState } from "@tiptap/react"

export function CharactersCount({ editor }: { editor: Editor }) {
    const { charactersCount, wordsCount } = useEditorState({
        editor,
        selector: context => ({
            charactersCount: context.editor.storage.characterCount.characters(),
            wordsCount: context.editor.storage.characterCount.words(),
        }),
    })

    return (
        <span className="text-xs text-muted-foreground">
            字符数：{charactersCount} | 单词数：{wordsCount}
        </span>
    )
}