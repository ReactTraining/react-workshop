import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link prefetch="none" to="/one">
        One
      </Link>
      <br />
      <Link to="/product">iPhone</Link>
    </div>
  )
}
