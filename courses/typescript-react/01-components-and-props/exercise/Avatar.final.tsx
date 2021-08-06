import * as React from 'react'
import classnames from 'classnames'
import { VisuallyHidden } from '@reach/visually-hidden'
import './Avatar.scss'

interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  alt: string
  size?: number
  src?: string
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  alt = 'Avatar',
  children,
  style,
  src,
  size = 3,
  ...domProps
}) => {
  className = classnames('avatar', className)
  if (src) {
    return <img src={src} alt={alt} style={style} className={className} {...domProps} />
  }

  return (
    <div style={{ fontSize: `${size}rem`, ...style }} className={className} {...domProps}>
      <VisuallyHidden>{alt}</VisuallyHidden>
      <div aria-hidden>{children}</div>
    </div>
  )
}

export default Avatar
