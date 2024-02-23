import { Outlet } from '@remix-run/react'

export default function ProductsLayout() {
  return (
    <div>
      <h1>Products Layout</h1>
      <hr />
      <Outlet />
    </div>
  )
}
