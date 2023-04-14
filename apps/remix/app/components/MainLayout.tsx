import { NavLink } from '@remix-run/react'
import classnames from 'classnames'
import { Logo } from './Logo'
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
    <header className="d bg-gradient-to-r from-sky-400 to-indigo-600">
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
  return (
    <CenterContent className="bg-white border-b">
      <div className="flex justify-between items-center">
        <nav className="primary-nav">
          <NavLink className="inline-block py-3 px-5 -mb-[1px] border-b-2" to="/">
            Home
          </NavLink>
          <NavLink className="inline-block py-3 px-5 -mb-[1px]" to="/products">
            Products
          </NavLink>
          <NavLink className="inline-block py-3 px-5 -mb-[1px]" to="/blog">
            Blog
          </NavLink>
        </nav>
        <div>
          <span className="mr-2">Cart is empty</span>
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
