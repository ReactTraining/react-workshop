import { Link, NavLink, Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '~/Avatar'
import { Heading } from '~/Heading'
import { logout, selectAuth } from './state/authSlice'

function MainLayout() {
  const dispatch = useDispatch()
  const { authenticated, user } = useSelector(selectAuth)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap justify-between items-center gap-3 border-b pb-3">
        <div className="flex flex-wrap items-center gap-6">
          <Heading size={3}>Redux Vacations</Heading>
          <nav>
            <NavLink to="/" end className="text-blue-600 hover:underline">
              Browse Vacations
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {authenticated === true && (
            <>
              <Avatar src={user.avatarUrl || ''} />
              <span className="whitespace-nowrap">{user.name}</span>
              <button className="button button-outline" onClick={() => dispatch(logout())}>
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
