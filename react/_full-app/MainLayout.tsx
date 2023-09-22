import { NavLink, Outlet } from 'react-router-dom'
import { AuthenticatedUserNav } from '~/AuthenticatedUserNav'
import { useAuthContext } from '~/AuthContext'
import { Logo } from '~/Logo'
import { Icon } from '~/Icon'

export function MainLayout() {
  const { authenticated } = useAuthContext()

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="border-b p-6 flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <nav className="flex items-center gap-3">
          <AuthenticatedUserNav />
        </nav>
      </header>
      <div className="border-b px-6 flex justify-between items-center text-sm">
        <nav>
          <NavLink to="/" className="inline-block text-textColor py-2 pr-4">
            Home
          </NavLink>
          {authenticated && (
            <NavLink to="/account" className="inline-block text-textColor py-2 px-4">
              My Account
            </NavLink>
          )}
          <NavLink
            to="/vacations/deal-of-the-day"
            className="inline-block text-textColor py-2 px-4"
          >
            Deal of the day!
          </NavLink>
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
      {/* Flex for full height children, child needs to be flex: 1 */}
      <div className="flex-1 flex [&>div]:flex-1 p-3 bg-gradient-to-b from-gray-50 to-white">
        <Outlet />
      </div>
    </div>
  )
}
