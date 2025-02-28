import { NavLink, Outlet, type LoaderFunctionArgs } from 'react-router'
import { Logo } from '~/components/Logo'
import { CenterContent } from '~/components/CenterContent'
import { getCart } from '~/utils/cart.server'
import { Icon } from '~/components/Icon'
import type { Route } from './+types/main-layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const lesson = process.env.REMIX_APP_DIR?.split('/').slice(-2).join('/') || ''

  const cart = await getCart(request)
  return { lesson, cart }
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

export default function MainLayout({ loaderData: { cart, lesson } }: Route.ComponentProps) {
  const quantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <div>
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
        <div className="flex justify-between items-center">
          <nav className="primary-nav">
            <NavLink to="/" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
              Home
            </NavLink>
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
  )
}
