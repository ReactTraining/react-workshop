import { Outlet } from 'react-router-dom'
import { WebsiteHeader } from '~/WebsiteHeader'
import { Centered } from '~/Centered'
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
