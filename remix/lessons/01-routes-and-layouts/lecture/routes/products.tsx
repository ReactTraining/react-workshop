import { Outlet } from '@remix-run/react'

export default function Page() {
  return (
    <div>
      Layout for all the product based pages
      <br />
      ------
      <br />
      <Outlet></Outlet>
    </div>
  )
}
