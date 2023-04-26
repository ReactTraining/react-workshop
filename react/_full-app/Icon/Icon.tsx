import classnames from 'classnames'
import { icons } from './icons'

export type IconName = keyof typeof icons

type Props = {
  name: IconName
  className?: string
  size?: number
  color?: string
}

export function Icon({ name, className, size = 1, color, ...rest }: Props) {
  const Component = icons[name]
  if (!Component) return null

  const props = {
    className: classnames('icon', className),
    style: {
      width: `${size}em`,
      height: `${size}em`,
      verticalAlign: 'middle',
      fill: color || 'currentColor',
    },
  }

  return <Component {...rest} {...props} />
}
