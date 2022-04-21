import { Outlet } from 'react-router-dom'
import { WebsiteHeader } from './WebsiteHeader'
import { Centered } from 'course-platform/Centered'
import styles from '../../../../apps/course-platform/WebsiteLayout/WebsiteLayout.module.scss'

export function WebsiteLayout() {
  return (
    <div className={styles.component}>
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
