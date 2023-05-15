import { NavLink } from '@remix-run/react'
import { SelectedLesson } from '~/state/LessonContext'
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

function SubHeader() {
  return (
    <CenterContent className="bg-white border-b">
      <nav className="primary-nav">
        <NavLink to="/" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
          Home
        </NavLink>
        <NavLink to="/account" className="inline-block py-3 px-5 -mb-[1px] border-b-2">
          Account
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
