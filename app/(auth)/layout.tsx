const Layout = ({ children }: { children: React.ReactNode }) => {
    return  (
        <div className="flex min-h-svh w-full items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
    )
}
export default Layout;