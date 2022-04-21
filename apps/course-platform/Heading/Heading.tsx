import classnames from 'classnames'
import styles from './Heading.module.scss'

type Props = {
  children: React.ReactNode
  size?: 1 | 2 | 3 | 4
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>

export function Heading({ as: Component = 'h1', size = 1, className, ...props }: Props) {
  return (
    <Component {...props} className={classnames(`${styles.component} size-${size}`, className)} />
  )
}

// <Heading>Main Heading</Heading> --> <h1 class="heading size-1">Main Heading</h1>
// <Heading as="h3">Heading</Heading> --> <h3 class="heading size-1">Main Heading</h3>
// <Heading size={4}>Heading</Heading> --> <h1 class="heading size-4">Main Heading</h1>
