import { Outlet, NavLink } from 'react-router-dom'
import { Icon } from '~/Icon'
import { SearchCourses } from '~/SearchCourses'
import styles from './AppSubLayouts.module.scss'

type AppSubLayoutProps = {
  children: React.ReactNode
  // Right Header Slot
  rightHeader?: any
}

function AppSubLayout({ children, rightHeader }: AppSubLayoutProps) {
  return (
    <div className={styles.component}>
      <header className="flex-split">
        <nav className="horizontal-spacing-large">{children}</nav>
        {rightHeader && <div>{rightHeader}</div>}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export function CoursesSubLayout() {
  return (
    <AppSubLayout rightHeader={<SearchCourses />}>
      <NavLink to="." end>
        <Icon name="home" />
        <span>All Courses</span>
      </NavLink>
      <NavLink to="add" end>
        <Icon name="createCourse" />
        <span>Add Course</span>
      </NavLink>
    </AppSubLayout>
  )
}

export function StudentsSubLayout() {
  return (
    <AppSubLayout>
      <NavLink to="." end>
        <Icon name="student" />
        <span>All Students</span>
      </NavLink>
    </AppSubLayout>
  )
}

export function ChatSubLayout() {
  return (
    <AppSubLayout>
      <NavLink to="." end>
        <Icon name="chat" />
        <span>All Chat Messages</span>
      </NavLink>
    </AppSubLayout>
  )
}
