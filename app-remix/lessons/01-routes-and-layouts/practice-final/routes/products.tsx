import { Outlet } from '@remix-run/react'

export default function Page() {
  return (
    <div className="p-3 bg-blue-300 border rounded space-y-3">
      <div className="p-3 bg-blue-200 rounded">
        <h1>Products Layout</h1>
      </div>
      <div className="flex gap-3">
        <main className="flex-1 p-3 bg-blue-200 rounded">
          <Outlet />
        </main>
        <aside className="w-52 min-h-[200px] p-3 bg-blue-200 rounded">Sidebar</aside>
      </div>
    </div>
  )
}
