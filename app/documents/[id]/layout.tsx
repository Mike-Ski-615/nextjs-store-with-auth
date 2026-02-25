import { MenubarProvider } from "@/components/editor/menubar/menubar-context"

export default function DocumentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-screen flex flex-col">
            <MenubarProvider>
                {children}
            </MenubarProvider>
        </div>
    )
}
