import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from '@remix-run/react'
import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node'
import { MainLayout } from '~/components/MainLayout'
import { Heading } from '~/components/Heading'
import { CenterContent } from '~/components/CenterContent'
import { getSessionUser } from '~/utils/auth.server'
import { AuthProvider } from '~/state/AuthContext'
import { CartProvider } from '~/state/CartContext'
import { getCart } from '~/utils/cart.server'
import stylesheet from '~/styles/app.css?url'
import type { PropsWithChildren } from 'react'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader({ request }: LoaderFunctionArgs) {
  const [sessionUser, cart] = await Promise.all([getSessionUser(request), getCart(request)])
  return json({ sessionUser, cart })
}

export default function App() {
  return <Outlet />
}

export function Layout({ children }: PropsWithChildren) {
  const { sessionUser, cart } = useRouteLoaderData<typeof loader>('root')!

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
        <AuthProvider user={sessionUser}>
          <CartProvider cart={cart || []}>
            <MainLayout>{children}</MainLayout>
          </CartProvider>
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
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
    <CenterContent className="pt-6 pb-20">
      <div className="bg-white p-6 rounded-md space-y-6">
        <Heading size={1}>{heading}</Heading>
        <p>{message}</p>
      </div>
    </CenterContent>
  )
}
