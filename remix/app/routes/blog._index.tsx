import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getAllPosts } from '~/utils/blog.server'
import { Heading } from '~/components/Heading'

// export const loader = async ({ params }: LoaderArgs) => {
//   const slug = params.slug
//   if (!slug) throw new Response('Not found', { status: 404 })

//   try {
//     const { frontmatter, code } = await getPost(slug)
//     return json({ frontmatter, code })
//   } catch (err) {
//     throw new Response('Not found', { status: 404 })
//   }
// }

export async function loader() {
  try {
    const posts = await getAllPosts()
    return json({ posts })
  } catch (error) {
    console.error(error)
    throw new Response('Not found', { status: 404 })
  }
}

export default function () {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <article className="space-y-3">
      <Heading>Blog</Heading>

      {posts.map((post) => {
        const path = `/blog/${post.slug}`
        return (
          <div key={path} className="bg-white rounded p-3 space-y-2">
            <Heading as="h2" size={3}>
              {post.title}
            </Heading>
            <Link to={path}>{path}</Link>
          </div>
        )
      })}
    </article>
  )
}
