import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteLoaderData,
  type LinksFunction,
  type LoaderFunctionArgs,
} from 'react-router'
import { MainLayout } from '~/components/MainLayout'
import { Heading } from '~/components/Heading'
import { CenterContent } from '~/components/CenterContent'
import { getSessionUser } from '~/utils/auth.server'
import { AuthProvider } from '~/state/AuthContext'
import { CartProvider } from '~/state/CartContext'
import { getCart } from '~/utils/cart.server'
import stylesheet from '~/styles/app.css?url'
import type { PropsWithChildren } from 'react'

import type { Route } from './+types/root'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export async function loader({ request }: LoaderFunctionArgs) {
  const [sessionUser, cart] = await Promise.all([getSessionUser(request), getCart(request)])
  return { sessionUser, cart }
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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

// import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

// import type { Route } from './+types/root'

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {children}
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   )
// }

// export default function App() {
//   return <Outlet />
// }

// export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
//   let message = 'Oops!'
//   let details = 'An unexpected error occurred.'
//   let stack: string | undefined

//   if (isRouteErrorResponse(error)) {
//     message = error.status === 404 ? '404' : 'Error'
//     details =
//       error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
//   } else if (import.meta.env.DEV && error && error instanceof Error) {
//     details = error.message
//     stack = error.stack
//   }

//   return (
//     <main className="pt-16 p-4 container mx-auto">
//       <h1>{message}</h1>
//       <p>{details}</p>
//       {stack && (
//         <pre className="w-full p-4 overflow-x-auto">
//           <code>{stack}</code>
//         </pre>
//       )}
//     </main>
//   )
// }
