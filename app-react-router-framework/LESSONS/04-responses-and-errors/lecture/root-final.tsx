import { PropsWithChildren } from 'react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from '@remix-run/react'
import { type LinksFunction } from '@remix-run/node'
import stylesheet from '~/index.css?url'
import { MainLayout } from './components/MainLayout'
import { LessonProvider } from '~/state/LessonContext'
import { CenterContent } from '~/components/CenterContent'
import { Heading } from '~/components/Heading'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader() {
  const lesson = process.env.REMIX_APP_DIR?.split('/').slice(-2).join('/') || ''
  return { lesson }
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()

  let heading = 'Unknown Error'
  let message = ''

  if (isRouteErrorResponse(error)) {
    heading = error.status + ' ' + error.statusText
    message = error.data
  } else if (error instanceof Error) {
    heading = 'Page Error'
    message = error.message
  }

  return (
    <CenterContent className="pt-6 pb-20">
      <div className="bg-white p-6 rounded-md space-y-6">
        <Heading size={1}>{heading}</Heading>
        <p>{message}</p>
      </div>
    </CenterContent>
  )
}

// https://remix.run/docs/en/main/file-conventions/root#layout-export

export function Layout({ children }: PropsWithChildren) {
  const { lesson } = useRouteLoaderData<typeof loader>('root')!

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
          <MainLayout>{children}</MainLayout>
        </LessonProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
