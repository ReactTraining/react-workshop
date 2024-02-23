import { Outlet } from '@remix-run/react'

export default function MainLayout() {
  return (
    <div>
      <h1>MainLayout</h1>
      <Outlet></Outlet>
    </div>
  )
}
