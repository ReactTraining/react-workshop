import { Outlet } from '@remix-run/react'

export default function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <hr />
      <Outlet />
    </div>
  )
}
