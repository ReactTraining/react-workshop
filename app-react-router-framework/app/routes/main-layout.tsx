import { Link, NavLink, Outlet, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { Logo } from '~/components/Logo'
import { CenterContent } from '~/components/CenterContent'
import { AuthenticatedUserNav } from '~/components/AuthenticatedUserNav'
import { Icon } from '~/components/Icon'
import { getSessionUser } from '~/utils/auth.server'
import { getCart } from '~/utils/cart.server'
import { AuthProvider } from '~/state/AuthContext'
import { CartProvider } from '~/state/CartContext'

export async function loader({ request }: LoaderFunctionArgs) {
  const [sessionUser, cart] = await Promise.all([getSessionUser(request), getCart(request)])
  return { sessionUser, cart }
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function MainLayout() {
  const { sessionUser, cart } = useLoaderData<LoaderData>()
  const quantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <AuthProvider user={sessionUser}>
      <CartProvider cart={cart || []}>
        <div>
          <header className="d bg-gradient-to-r from-sky-400 to-indigo-950">
            <CenterContent className="border-b py-3">
              <div className="flex justify-between items-center">
                <div className="">
                  <Logo />
                </div>
                <div className="">
                  <AuthenticatedUserNav />
                </div>
              </div>
            </CenterContent>
          </header>

          <CenterContent className="bg-white border-b">
            <div className="flex justify-between items-center">
              <nav className="primary-nav">
                <NavLink to="/" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
                  Home
                </NavLink>
                <NavLink to="/products" className="inline-block py-3 px-5 -mb-[1px]">
                  Products
                </NavLink>
                <NavLink to="/blog" className="inline-block py-3 px-5 -mb-[1px]">
                  Blog
                </NavLink>
                {sessionUser && (
                  <Link to="/logout" className="inline-block py-3 px-5 -mb-[1px]">
                    Logout
                  </Link>
                )}
              </nav>
              <div>
                <span className="mr-2">
                  {quantity > 0 ? `${quantity} items in your cart` : 'Cart is empty'}
                </span>
                <span className="text-brandColor">
                  <Icon name="cart" />
                </span>
              </div>
            </div>
          </CenterContent>

          <CenterContent className="pt-6 pb-20">
            <Outlet />
          </CenterContent>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
