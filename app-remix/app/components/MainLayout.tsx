import { Link, NavLink } from '@remix-run/react'
import { useAuth } from '~/state/AuthContext'
import { useCart } from '~/state/CartContext'
import { Logo } from './Logo'
import { CenterContent } from './CenterContent'
import { AuthenticatedUserNav } from './AuthenticatedUserNav'
import { Icon } from './Icon'

type MainLayoutProps = {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <SubHeader />
      <CenterContent className="pt-6 pb-20">{children}</CenterContent>
    </div>
  )
}

function Header() {
  return (
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
  )
}

function SubHeader() {
  const { user } = useAuth()
  const { cart } = useCart()

  const quantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
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
          {user && (
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
  )
}
