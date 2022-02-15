import { Outlet, Link, NavLink } from 'react-router-dom'
import { Logo } from 'course-platform/Logo'
import { Centered } from 'course-platform/Centered'

export function WebsiteLayout() {
  return (
    <div className="website-layout">
      <WebsiteHeader />
      <hr />
      <main>
        <Centered>
          <Outlet />
        </Centered>
      </main>
    </div>
  )
}

const WebsiteHeader: React.FC = () => {
  return (
    <header className="spacing">
      <Centered>
        <div className="flex-split">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="horizontal-spacing-large">
            <NavLink to="/" className="primary-nav-item">
              Home
            </NavLink>
            <NavLink to="/admin" className="primary-nav-item">
              Admin
            </NavLink>
          </nav>
        </div>
      </Centered>
    </header>
  )
}
