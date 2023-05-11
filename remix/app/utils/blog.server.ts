import { readdir } from 'fs/promises'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'

const blogPostsPath = path.join(`${__dirname}/../app/blog-posts`)

export type FrontmatterType = {
  title: string
  date: Date
  draft?: true // either `true` not not supplied
}

export type Post = FrontmatterType & {
  slug: string
  markdown: string
}

function fixFrontmatter(f: any) {
  return {
    ...f,
    date: new Date(f.date as string),
  } as FrontmatterType
}

export async function getPost(slug: string) {
  const parsed = await parseMDX(path.join(blogPostsPath, slug + '.mdx'))
  const frontmatter = fixFrontmatter(parsed.frontmatter)
  const code = parsed.code
  return { frontmatter, code }
}

export async function getAllPosts(): Promise<Post[]> {
  const postsPath = await readdir(blogPostsPath, {
    withFileTypes: true,
  })

  let posts = await Promise.all(
    postsPath.map(async (pathInfo) => {
      // Only get .mdx files
      if (!pathInfo.name.includes('.mdx')) return

      const parsed = await parseMDX(path.join(blogPostsPath, pathInfo.name))
      const frontmatter = fixFrontmatter(parsed.frontmatter)

      // Don't show draft posts in production
      if (process.env.NODE_ENV === 'production' && frontmatter.draft) return

      return {
        slug: pathInfo.name.replace(/\.mdx/, ''),
        ...frontmatter,
      }
    })
  )

  posts = posts.filter(Boolean).sort((a, b) => b.date.getTime() - a.date.getTime())
  return posts as Post[]
}

/****************************************
  Parse MDX
*****************************************/

// https://github.com/kentcdodds/mdx-bundler/blob/main/README.md#nextjs-esbuild-enoent

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe'
  )
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild'
  )
}

export async function parseMDX(file: string) {
  const { frontmatter, code } = await bundleMDX({
    file,
    // mdxOptions(options, frontmatter) {
    //   // this is the recommended way to add custom remark/rehype plugins:
    //   // The syntax might look weird, but it protects you in case we add/remove
    //   // plugins in the future.
    //   options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
    //   options.rehypePlugins = [...(options.rehypePlugins ?? []), myRehypePlugin]

    //   return options
    // },
    // esbuildOptions(options, frontmatter) {
    //   options.minify = false
    //   options.target = ['es2020', 'chrome58', 'firefox57', 'safari11', 'edge16', 'node12']

    //   return options
    // },
  })
  return { frontmatter, code }
}
