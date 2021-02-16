import React from 'react'
import classnames from 'classnames'
import 'ProjectPlanner/Avatar.scss'

type Props = {
  src?: string | null
  size?: number
  className?: string
}

export const Avatar: React.FC<Props> = ({ src, size = 3, className, ...props }) => {
  const Component: any = src ? 'img' : 'div'

  return (
    <Component
      src={src}
      alt="Avatar"
      style={{ fontSize: `${size}rem` }}
      className={classnames('avatar', className)}
      {...props}
    />
  )
}
