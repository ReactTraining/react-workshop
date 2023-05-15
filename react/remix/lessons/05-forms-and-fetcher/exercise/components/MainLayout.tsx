import { NavLink } from '@remix-run/react'
import { SelectedLesson } from '~/state/LessonContext'
import { Logo } from '~/components/Logo'
import { Icon } from '~/components/Icon'
import { CartItemType } from '~/utils/cart.server'

type PropsWithCart = {
  cart: CartItemType[]
}

type MainLayoutProps = {
  children: React.ReactNode
} & PropsWithCart

export function MainLayout({ children, cart }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <SubHeader cart={cart} />
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
          <div className="text-white/60">
            <SelectedLesson />
          </div>
        </div>
      </CenterContent>
    </header>
  )
}

function SubHeader({ cart }: PropsWithCart) {
  const quantity = cart?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <CenterContent className="bg-white border-b">
      <div className="flex justify-between items-center">
        <nav className="primary-nav">
          <NavLink to="/" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
            Home
          </NavLink>
          <NavLink to="/register" className="inline-block py-3 px-5 -mb-[1px]">
            Register
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
  )
}

type CenterContentProps = {
  className?: string
  children: React.ReactNode
}

export function CenterContent({ children, className }: CenterContentProps) {
  return (
    <div className={className}>
      <div className="ml-auto mr-auto max-w-[1200px] pl-3 pr-3">{children}</div>
    </div>
  )
}
