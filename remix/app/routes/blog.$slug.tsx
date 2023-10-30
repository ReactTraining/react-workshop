import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MDXContent } from '~/components/MDXContent'
import { getPost } from '~/utils/blog.server'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Heading } from '~/components/Heading'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug
  if (!slug) throw new Response('Not found', { status: 404 })

  try {
    const { frontmatter, code } = await getPost(slug)
    return json({ frontmatter, code })
  } catch (err) {
    throw new Response('Not found', { status: 404 })
  }
}

export default function () {
  const { frontmatter, code } = useLoaderData<typeof loader>()

  return (
    <article className="space-y-3">
      <Heading>{frontmatter.title}</Heading>
      <MDXContent code={code} />
    </article>
  )
}
