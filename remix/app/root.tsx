import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import { LinksFunction, LoaderArgs, json } from '@remix-run/node'
import { MainLayout } from '~/components/MainLayout'
import { Heading } from '~/components/Heading'
import { CenterContent } from '~/components/CenterContent'
import { getSessionUser } from '~/utils/auth.server'
import { AuthProvider } from '~/state/AuthContext'
import { CartProvider } from '~/state/CartContext'
import { getCart } from '~/utils/cart.server'
import stylesheet from '~/styles/app.css'
import type { UnpackLoader } from '~/utils/helpers'
import type { PropsWithChildren } from 'react'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader({ request }: LoaderArgs) {
  const [sessionUser, cart] = await Promise.all([getSessionUser(request), getCart(request)])
  return json({ sessionUser, cart })
}

export type LoaderType = UnpackLoader<typeof loader>

export default function App() {
  const { sessionUser, cart } = useLoaderData() as LoaderType

  return (
    <Document>
      <AuthProvider user={sessionUser}>
        <CartProvider cart={cart || []}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </CartProvider>
      </AuthProvider>
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
        <LiveReload />
      </body>
    </html>
  )
}
