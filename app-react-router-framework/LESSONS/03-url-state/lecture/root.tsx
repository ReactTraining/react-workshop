import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import { type LinksFunction } from 'react-router'
import stylesheet from '~/index.css?url'
import { LessonProvider } from '~/state/LessonContext'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader() {
  const lesson = process.env.REMIX_APP_DIR?.split('/').slice(-2).join('/') || ''
  return { lesson }
}

export default function App() {
  const { lesson } = useLoaderData<typeof loader>()

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
      <body>
        <LessonProvider selectedLesson={lesson}>
          <Outlet />
        </LessonProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
