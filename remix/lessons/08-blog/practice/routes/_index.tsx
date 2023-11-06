import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div className="space-y-3">
      <p>👋 Let's build an MDX Blog</p>
      <p>
        <Link to="/blog/first-post">My First Blog Post</Link>
      </p>
      <p>This link goes to a 404 because we don't yet have a path for /blog/[slug]</p>
    </div>
  )
}
