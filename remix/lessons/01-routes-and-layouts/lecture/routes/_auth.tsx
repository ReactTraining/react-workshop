import { Outlet } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      AuthLayout
      <Outlet></Outlet>
    </div>
  )
}
