import { Link, NavLink } from 'react-router-dom'
import { Logo } from 'spa/Logo'
import { Centered } from 'spa/Centered'
import { AuthenticatedDropdownMenu } from 'spa/AuthenticatedDropdownMenu'
import { useAuthContext } from 'spa/AuthContext'
import styles from './WebsiteHeader.module.scss'

export function WebsiteHeader() {
  const { authenticated } = useAuthContext()

  return (
    <header className={`${styles.component} spacing`}>
      <Centered>
        <div className="flex-split">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="horizontal-spacing-large">
            <NavLink to="/" className="primary-nav-item">
              Home
            </NavLink>
            <NavLink to="/courses" className="primary-nav-item">
              Courses
            </NavLink>
            {authenticated === true ? (
              <>
                <NavLink to="/admin" className="primary-nav-item">
                  Admin
                </NavLink>
                <AuthenticatedDropdownMenu />
              </>
            ) : (
              <>
                <NavLink to="/login" className="primary-nav-item">
                  Login
                </NavLink>
                <NavLink to="/signup" className="button primary-nav-item">
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </Centered>
    </header>
  )
}
