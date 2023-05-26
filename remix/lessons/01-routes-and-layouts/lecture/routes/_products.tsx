import { Outlet } from '@remix-run/react'

export default function ProductsSubLayout() {
  return (
    <div>
      <div>Products Sub Layout</div>
      <Outlet></Outlet>
    </div>
  )
}
