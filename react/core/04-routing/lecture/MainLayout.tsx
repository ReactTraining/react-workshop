import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '~/Logo'
import { Icon } from '~/Icon'

export function MainLayout() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="border-b p-6 flex justify-between items-center">
        <div>
          <Logo />
        </div>
      </header>
      <div className="border-b px-6 flex justify-between items-center text-sm">
        <nav>
          <a href="/" className="inline-block text-textColor py-2 pr-4">
            Home
          </a>
          <a href="/one" className="inline-block text-textColor py-2 px-4">
            Page One
          </a>
          <a href="/two" className="inline-block text-textColor py-2 px-4">
            Page Two
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
        <Outlet />
      </div>
    </div>
  )
}
