import { Outlet, NavLink } from 'react-router-dom'
import { Logo } from '~/Logo'
import { Icon } from '~/components/Icon'
import styles from '../../../../react/_full-app/AppLayout/AppLayout.module.scss'
import subNavStyles from '../../../../react/_full-app/AppSubLayouts/AppSubLayouts.module.scss'

export function AppLayout() {
  return (
    <div className={`${styles.component} flex flex-columns`}>
      <header className="primary-header flex-split" data-theme="dark">
        <div>
          <Logo />
        </div>
        <nav>{/* Nav Goes Here Later */}</nav>
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
          {/* Sub Layout (This needs to be different on a per section basis: courses, students, etc) */}
          <div className={subNavStyles.component}>
            <header className="flex-split">
              <nav className="horizontal-spacing-large">
                <NavLink to="courses" end>
                  <Icon name="home" />
                  <span>All Courses</span>
                </NavLink>
                <NavLink to="add" end>
                  <Icon name="createCourse" />
                  <span>Add Course</span>
                </NavLink>
              </nav>
            </header>
            <main>
              <Outlet />
            </main>
          </div>
          {/* End Sub Layout */}
        </div>
      </div>
    </div>
  )
}

export function AppSubLayout() {
  return null
}
