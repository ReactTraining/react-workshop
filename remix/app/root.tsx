import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { LinksFunction, LoaderArgs, json } from '@remix-run/node'
import { MainLayout } from '~/components/MainLayout'
import { getSessionUser } from '~/utils/auth.server'
import { AuthProvider } from '~/state/AuthContext'
import { CartProvider } from '~/state/CartContext'
import { getCart } from '~/utils/cart.server'
import stylesheet from '~/styles/app.css'
import type { UnpackLoader } from '~/utils/helpers'
import type { PropsWithChildren } from 'react'

export { ErrorBoundary } from './error-handler'
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader({ request }: LoaderArgs) {
  const [sessionUser, cart] = await Promise.all([getSessionUser(request), getCart(request)])
  return json({ sessionUser, cart })
}

export type LoaderType = UnpackLoader<typeof loader>

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

function Document({ children }: PropsWithChildren) {
  const { sessionUser, cart } = useLoaderData() as LoaderType

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
        <LiveReload />
      </body>
    </html>
  )
}
