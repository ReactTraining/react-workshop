import { Link, NavLink } from 'react-router-dom'
import { Logo } from '~/Logo'
import { Centered } from '~/Centered'
import { AuthenticatedDropdownMenu } from './AuthenticatedDropdownMenu'
import { useAuthContext } from './AuthContext'
import styles from '../../../../react/_full-app/WebsiteHeader/WebsiteHeader.module.scss'

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
