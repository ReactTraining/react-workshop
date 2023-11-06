import { Link } from '@remix-run/react'

export const loader = async () => {
  console.log('> LOADER ONE')
  return null
}

export default function PageOne() {
  return (
    <div>
      <h1>One</h1>
      <Link to="/two" prefetch="render">
        Two
      </Link>
      <br />
      <Link to="/three" prefetch="viewport">
        Three
      </Link>
    </div>
  )
}
