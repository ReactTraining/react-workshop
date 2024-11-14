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
} from '@remix-run/react'
import { type LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import stylesheet from '~/styles/app.css?url'
import { MainLayout } from './components/MainLayout'
import { LessonProvider } from '~/state/LessonContext'
import { CenterContent } from '~/components/CenterContent'
import { Heading } from '~/components/Heading'
import { getCart } from '~/utils/cart.server'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // This is just so we can show you what lesson you're on
  const lesson = process.env.REMIX_APP_DIR?.split('/').slice(-2).join('/') || ''

  const cart = await getCart(request)
  return { lesson, cart }
}

export type LoaderData = typeof loader

export default function App() {
  const { lesson, cart } = useLoaderData<LoaderData>()

  return (
    <Document>
      <LessonProvider selectedLesson={lesson}>
        <MainLayout cart={cart}>
          <Outlet />
        </MainLayout>
      </LessonProvider>
    </Document>
  )
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
    <Document>
      <CenterContent className="pt-6 pb-20">
        <div className="bg-white p-6 rounded-md space-y-6">
          <Heading size={1}>{heading}</Heading>
          <p>{message}</p>
        </div>
      </CenterContent>
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
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
