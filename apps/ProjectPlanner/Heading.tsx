import React from 'react'
import classnames from 'classnames'
import 'ProjectPlanner/Heading.scss'

type Props = {
  size?: 1 | 2 | 3 | 4
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  [key: string]: any
}

export const Heading: React.FC<Props> = ({
  as: Component = 'h1',
  size = 1,
  className,
  ...rest
}) => {
  return <Component className={classnames(`heading size-${size}`, className)} {...rest} />
}
