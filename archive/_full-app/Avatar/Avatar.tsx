import classnames from 'classnames'
import styles from './Avatar.module.scss'

type Props = {
  src?: string | null
  size?: number
  className?: string
}

export function Avatar({ src = '', size = 3, className, ...props }: Props) {
  return src ? (
    <img
      {...props}
      src={src}
      alt="User Avatar"
      style={{ fontSize: `${size}rem` }}
      className={classnames(styles.component, className)}
    />
  ) : (
    <div
      {...props}
      style={{ fontSize: `${size}rem` }}
      className={classnames(styles.component, className)}
    />
  )
}
