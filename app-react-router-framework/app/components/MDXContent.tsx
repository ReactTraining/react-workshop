// import { getMDXComponent } from 'mdx-bundler/client'
// import { useMemo } from 'react'
// import { Link } from 'react-router-dom'

// export function MDXContent({ code }: { code: string }) {
//   const Component = useMemo(() => getMDXComponent(code), [code])
//   return (
//     <Component
//       components={{
//         a: Anchor,
//       }}
//     />
//   )
// }

// /****************************************
//   Substitutions
// *****************************************/

// type AnchorProps = {
//   children: React.ReactNode
//   href: string
// } & React.HTMLAttributes<HTMLAnchorElement>

// function Anchor({ href, children, ...props }: AnchorProps) {
//   if (href.toLowerCase().startsWith('http')) {
//     return (
//       <a href={href} {...props}>
//         {children}
//       </a>
//     )
//   } else {
//     return (
//       <Link to={href} {...props}>
//         {children}
//       </Link>
//     )
//   }
// }
