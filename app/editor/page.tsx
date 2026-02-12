import { MenuBar } from "@/components/editor/menubar/menubar";
import Tiptap from "@/components/Tiptap";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <MenuBar />
      <Tiptap />
    </div>
  );
}
