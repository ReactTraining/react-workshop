import classnames from 'classnames'
import { icons } from './icons'
import type { Icons } from './icons'

type Props = {
  name: Icons
  className?: string
  size?: number
}

export function Icon({ name, className, size = 1.3, ...rest }: Props) {
  const Component = icons[name]
  if (!Component) return null

  const props = {
    className: classnames('icon', className),
    style: {
      display: 'inline',
      width: `${size}em`,
      height: `${size}em`,
      verticalAlign: 'middle',
      color: 'currentColor',
      fill: 'currentColor',
    },
  }

  return <Component {...rest} {...props} />
}
