type Props = {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="p-3 border-4 rounded space-y-3">
      <div className="p-3 border-4 rounded">
        <h1>Main Layout</h1>
      </div>
      <div className="flex gap-3">
        <aside className="w-52 min-h-[200px] p-3 border-4 rounded">Sidebar</aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
