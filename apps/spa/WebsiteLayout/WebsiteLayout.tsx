import { Outlet } from 'react-router-dom'
import { WebsiteHeader } from 'spa/WebsiteHeader'
import { Centered } from 'spa/Centered'
import styles from './WebsiteLayout.module.scss'

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
