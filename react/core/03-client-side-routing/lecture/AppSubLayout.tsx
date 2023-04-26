import { Outlet, NavLink } from 'react-router-dom'
import { Icon } from '~/Icon'
import styles from '../../../../react/_full-app/AppSubLayouts/AppSubLayouts.module.scss'

export function CoursesSubLayout() {
  return (
    <div className={styles.component}>
      <header className="flex-split">
        <nav className="horizontal-spacing-large">
          <NavLink to="." end>
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
  )
}
