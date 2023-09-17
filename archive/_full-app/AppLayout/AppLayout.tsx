import { Outlet, Link, NavLink, Navigate, useLocation } from 'react-router-dom'
import { Loading } from '~/Loading'
import { Logo } from '~/Logo'
import { AuthenticatedDropdownMenu } from '~/AuthenticatedDropdownMenu'
import { Icon } from '~/components/Icon'
import styles from './AppLayout.module.scss'
import { useAuthContext } from '~/AuthContext'

export function AppLayout() {
  const location = useLocation()
  const { authenticated } = useAuthContext()

  if (authenticated === false) {
    return <Navigate to="/login" replace state={{ backTo: location }} />
  }

  if (authenticated === null) {
    return <Loading />
  }

  return (
    <div className={`${styles.component} flex flex-columns`}>
      <header className="primary-header flex-split" data-theme="dark">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <nav>
          <AuthenticatedDropdownMenu />
        </nav>
      </header>
      <div className="flex-1 flex">
        <aside className="primary-sidebar">
          <nav>
            <NavLink to="courses">
              <Icon name="courses" size={2} />
              <span>Courses</span>
            </NavLink>
            <NavLink to="students">
              <Icon name="student" size={2} />
              <span>Students</span>
            </NavLink>
            <NavLink to="chat">
              <Icon name="chat" size={2} />
              <span>Chat</span>
            </NavLink>
          </nav>
        </aside>
        <div className="primary-content flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
