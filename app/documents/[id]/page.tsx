import { EditorShell } from "./editor-shell"
import { Room } from "./Room"

export default async function DocumentPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Room roomId={id}>
      <EditorShell />
    </Room>
  )
}
