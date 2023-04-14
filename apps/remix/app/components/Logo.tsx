import { Link } from '@remix-run/react'

export function Logo() {
  return (
    <Link to="/">
      <img width="200px" src="/images/logo.svg" alt="TechShopper Logo" />
    </Link>
  )
}
