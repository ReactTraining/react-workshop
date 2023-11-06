import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div className="space-y-3">
      <p>👋 Let's build an MDX Blog</p>
      <p>
        <Link to="/blog/first-post">My First Blog Post</Link>
      </p>
    </div>
  )
}
