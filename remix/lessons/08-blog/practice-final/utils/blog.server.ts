import path from 'path'
import { bundleMDX } from 'mdx-bundler'

// __dirname in Remix will be the `build` folder
const blogPostsPath = path.join(`${__dirname}/../lessons/08-blog/exercise-final/blog-posts`)

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

export async function getPost(slug: string) {
  const file = path.join(blogPostsPath, slug + '.mdx')
  const { frontmatter, code } = await bundleMDX({ file })
  return { frontmatter, code }
}
