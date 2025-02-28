import { NavLink, Outlet, type LoaderFunctionArgs } from 'react-router'
import { Logo } from '~/components/Logo'
import { CenterContent } from '~/components/CenterContent'
import type { Route } from './+types/main-layout'
import { AuthProvider } from '~/state/AuthContext'
import { CartProvider } from '~/state/CartContext'
import { getSessionUser } from '~/utils/auth.server'
import { getCart } from '~/utils/cart.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const [sessionUser, cart] = await Promise.all([getSessionUser(request), getCart(request)])
  const lesson = process.env.REMIX_APP_DIR?.split('/').slice(-2).join('/') || ''
  return { sessionUser, cart, lesson }
}

export default function MainLayout({
  loaderData: { sessionUser, cart, lesson },
}: Route.ComponentProps) {
  return (
    <AuthProvider user={sessionUser}>
      <CartProvider cart={cart || []}>
        <header className="d bg-gradient-to-r from-sky-400 to-indigo-950">
          <CenterContent className="border-b py-3">
            <div className="flex justify-between items-center">
              <div className="">
                <Logo />
              </div>
              <div className="text-white/60">{lesson}</div>
            </div>
          </CenterContent>
        </header>
        <CenterContent className="bg-white border-b">
          <nav className="primary-nav">
            <NavLink to="/" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
              Home
            </NavLink>
          </nav>
        </CenterContent>
        <CenterContent className="pt-6 pb-20">
          <Outlet />
        </CenterContent>
      </CartProvider>
    </AuthProvider>
  )
}
