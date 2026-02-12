import { MenubarDemo } from "@/components/editor/header/menu-bar";
import Tiptap from "@/components/Tiptap";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <MenubarDemo />
      <Tiptap />
    </div>
  );
}
