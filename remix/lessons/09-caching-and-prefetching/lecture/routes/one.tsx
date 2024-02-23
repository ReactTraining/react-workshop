import { Link } from '@remix-run/react'

export const loader = async () => {
  console.log('> LOADER ONE')
  return null
}

export default function PageOne() {
  return (
    <div>
      <h1>One</h1>
      <Link prefetch="render" to="/two">
        Two
      </Link>
      <br />
      <Link prefetch="render" to="/three">
        Three
      </Link>
    </div>
  )
}
