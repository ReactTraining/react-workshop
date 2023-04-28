import { NavLink } from '@remix-run/react'
import { Logo } from '~/components/Logo'

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
        <Logo />
      </CenterContent>
    </header>
  )
}

function SubHeader() {
  return (
    <CenterContent className="bg-white border-b">
      <nav className="primary-nav">
        <NavLink className="inline-block py-3 px-5 -mb-[1px] border-b-2" to="/">
          Home
        </NavLink>
        <NavLink className="inline-block py-3 px-5 -mb-[1px]" to="/products">
          Products
        </NavLink>
      </nav>
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
