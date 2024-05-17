import { Logo } from '~/Logo'
import { Icon } from '~/Icon'

type Props = {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="border-b p-4 flex justify-between items-center">
        <div>
          <Logo />
        </div>
      </header>
      <div className="border-b px-6 flex justify-between items-center text-sm">
        <nav>
          <a href="/" className="inline-block text-textColor py-2 pr-4">
            Home
          </a>
        </nav>
        <nav>
          <a href="/" className="inline-block text-textColor py-2 px-4">
            Sandy Beaches
          </a>
          <a href="/" className="inline-block text-textColor py-2 px-4">
            Open Spaces
          </a>
          <a href="/" className="inline-block text-textColor py-2 px-4">
            Our Favorites
          </a>
          <a href="/" className="inline-block text-textColor py-2 pl-4 border-l">
            <span>Categories</span>
            <Icon name="chevronDown" />
          </a>
        </nav>
      </div>
      <div className="flex-1 flex [&>div]:flex-1 p-3 bg-gradient-to-b from-gray-50 to-white">
        <AdminSubLayout>{children}</AdminSubLayout>
      </div>
    </div>
  )
}

type SubLayoutProps = {
  children: React.ReactNode
}

export function AdminSubLayout({ children }: SubLayoutProps) {
  return (
    <div className="flex -m-3">
      <aside className="w-80 bg-white border-r p-6 space-y-6">
        <section className="space-y-3"></section>
      </aside>
      <div className="flex-1 p-3">{children}</div>
      <aside className="w-80 bg-white border-l p-6 space-y-6">
        <section className="space-y-3"></section>
      </aside>
    </div>
  )
}
