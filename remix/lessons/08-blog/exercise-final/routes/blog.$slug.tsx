import { useMemo } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Heading } from '~/components/Heading'
import { getMDXComponent } from 'mdx-bundler/client'
import { getPost } from '../utils/blog.server'

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
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <article className="space-y-3">
      <Heading>{frontmatter.title}</Heading>
      <Component />
    </article>
  )
}
