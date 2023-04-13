import { Logo } from './Logo'
import { AuthenticatedUserNav } from './AuthenticatedUserNav'

type MainLayoutProps = {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <SubHeader />
      <CenterContent className="pt-6">{children}</CenterContent>
    </div>
  )
}

function Header() {
  return (
    <header>
      <CenterContent className="bg-white border-b border-lineColor py-3">
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
    <CenterContent className="bg-white border-b border-lineColor py-3">
      <div className="flex justify-between items-center">
        <div className="">Left</div>
        <div className="">Right</div>
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
