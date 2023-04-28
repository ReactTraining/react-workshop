import { Outlet } from '@remix-run/react'

export default function () {
  return (
    <div className="m-6 p-3 bg-slate-300 border rounded space-y-3">
      <div className="p-3 bg-slate-200 rounded">
        <h1>Main Layout</h1>
      </div>
      <div className="flex gap-3">
        <aside className="w-52 min-h-[200px] p-3 bg-slate-200 rounded">Sidebar</aside>
        <main className="flex-1 p-3 bg-slate-200 rounded">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
