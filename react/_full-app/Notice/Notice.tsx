import classnames from 'classnames'
import styles from './Notice.module.scss'

type Props = {
  children: React.ReactNode
  type?: 'error' | 'success' | 'default'
}

export function Notice({ children, type = 'default' }: Props) {
  return <div className={classnames(`${styles.component} notice-type-${type}`)}>{children}</div>
}
