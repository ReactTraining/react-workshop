import { useMemo } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import { Heading } from '~/components/Heading'
import { getMDXComponent } from 'mdx-bundler/client'
import { getPost } from '../utils/blog.server'

/*
CODE YOU'LL NEED

const blogPostsPath = path.join(`${__dirname}/../lessons/08-blog/exercise/blog-posts`)
const file = path.join(blogPostsPath, slug + '.mdx')
const { frontmatter, code } = await bundleMDX({ file })
*/

// 1. Rename this file so that a URL like `/blog/first-post` can be visited
//    the `first-post` part is should be a variable called slug that we will
//    have available to us in the loader.
// 2. Write a loader that will eventually get our blog post MDX from the
//    filesystem.
// 3. Use the params.slug the loader gives you to find the file. In other
//    words, if the url is /blog/first-post, then first-post is the slug
//    and there will be a file called first-post.mdx in /blog-posts
// 4. Use the code commented-out above to get a file and pass it into
//    bundleMDX which is a third-part tool. You'll need to do this in
//    a file that only runs on the server only. So make a `getPost` function
//    in utils/blog.server to run the code
// 5. In teh loader, use a try/catch when you call `getPost(slug)`. What if
//    the slug doesn't have a file? We would want to throw an error:
//    throw new Response('Not Found', { status: 404 })

export default function BlogPost() {
  // 6. Get code and frontmatter from loader

  // 7. Use this <Component /> to render where you want the blog content to go
  // const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <article className="space-y-3">
      <Heading>Blog Title</Heading>
      Blog Content Here
      {/* 8. <Component /> */}
    </article>
  )
}
