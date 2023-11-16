import { Outlet } from '@remix-run/react'

export default function Page() {
  return (
    <div>
      <h1>Layout for anything products related</h1>
      <h1></h1>
      <Outlet></Outlet>
    </div>
  )
}
