import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Logo } from '~/Logo'
import { Icon } from '~/Icon'
import { useAuthContext } from './AuthContext'
import { api } from '~/utils/api'

export function MainLayout() {
  const { authenticated, logout } = useAuthContext()
  const navigate = useNavigate()

  function onLogout() {
    // Logout of the server
    api.auth.logout().then(() => {
      // Then logout of global state and redirect
      logout()
      navigate('/')
    })
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="border-b p-6 flex justify-between items-center">
        <div>
          <Logo />
        </div>
      </header>
      <div className="border-b px-6 flex justify-between items-center text-sm">
        <nav>
          <NavLink to="/login" className="inline-block text-textColor py-2 pr-4">
            Login
          </NavLink>
          {authenticated && (
            <button className="inline-block text-textColor py-2 px-4" onClick={onLogout}>
              Logout
            </button>
          )}
          <NavLink to="/account" className="inline-block text-textColor py-2 px-4">
            Account
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
      <div className="flex-1 flex [&>div]:flex-1 p-3 bg-gradient-to-b from-gray-50 to-white">
        <Outlet />
      </div>
    </div>
  )
}
