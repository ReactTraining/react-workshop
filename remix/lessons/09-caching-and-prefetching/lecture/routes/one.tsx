import { Link } from '@remix-run/react'

export const loader = async () => {
  console.log('> LOADER ONE')
  return null
}

export default function One() {
  return (
    <div>
      <h1>One</h1>
      <Link to="/two">Two</Link>
      <br />
      <Link to="/three">Three</Link>
    </div>
  )
}
