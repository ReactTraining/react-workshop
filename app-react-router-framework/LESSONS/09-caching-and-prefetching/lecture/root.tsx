import { type PropsWithChildren } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { type LinksFunction } from '@remix-run/node'
import stylesheet from '~/index.css?url'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function Document({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="p-10">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
