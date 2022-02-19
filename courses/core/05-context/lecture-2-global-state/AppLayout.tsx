import { useContext } from 'react'
import { Outlet, Link, NavLink, Navigate, useLocation } from 'react-router-dom'
import { Loading } from 'course-platform/Loading'
import { Logo } from 'course-platform/Logo'
import { AuthenticatedDropdownMenu } from './AuthenticatedDropdownMenu'
import { Icon } from 'course-platform/Icon'
import styles from '../../../../apps/course-platform/AppLayout/AppLayout.module.scss'
// import { useAuthContext } from './AuthContext'

// Temporary
type Props = {
  [key: string]: any
}

export function AppLayout({ authenticated, user, logout }: Props) {
  if (authenticated === false) {
    return <Navigate to="/login" replace />
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
          <AuthenticatedDropdownMenu user={user} logout={logout} />
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
