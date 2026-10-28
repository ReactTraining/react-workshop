import { Link, NavLink, Outlet, useNavigation } from 'react-router'
import { Avatar } from '~/Avatar'
import { Heading } from '~/Heading'
import { useAuth } from './AuthContext'

function MainLayout() {
  const { authenticated, user, logout } = useAuth()

  // Loaders run before the next page renders, so we show navigation
  // progress here instead of in each page
  const navigation = useNavigation()

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap justify-between items-center gap-3 border-b pb-3">
        <div className="flex flex-wrap items-center gap-6">
          <Heading size={3}>Context + TanStack Query Vacations</Heading>
          <nav>
            <NavLink to="/" end className="text-blue-600 hover:underline">
              Browse Vacations
            </NavLink>
          </nav>
          {navigation.state === 'loading' && <span className="text-slate-500">Loading...</span>}
        </div>
        <div className="flex items-center gap-3">
          {authenticated === true && (
            <>
              <Avatar src={user.avatarUrl || ''} />
              <span className="whitespace-nowrap">{user.name}</span>
              <button className="button button-outline" onClick={logout}>
                Logout
              </button>
            </>
          )}
          {authenticated === false && (
            <Link to="/login" className="button button-outline">
              Login
            </Link>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default MainLayout
