import { Outlet } from '@remix-run/react'

export default function Page() {
  return (
    <div>
      <h1>Layout for all product related stuff</h1>
      <hr />
      <Outlet />
    </div>
  )
}
