import classnames from 'classnames'
import styles from './Notice.module.scss'

type Props = {
  type?: 'error' | 'success'
}

export const Notice: React.FC<Props> = ({ children, type = 'default' }) => {
  return <div className={classnames(`${styles.component} notice-type-${type}`)}>{children}</div>
}
