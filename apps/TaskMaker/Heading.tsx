import React from 'react'
import classnames from 'classnames'
import './Heading.scss'

type Props = {
  size?: number
  as?: any
  className?: string
}

export const Heading: React.FC<Props> = ({
  as: Component = 'h1',
  size = 1,
  className,
  ...rest
}) => {
  return <Component className={classnames('heading', `size-${size}`, className)} {...rest} />
}

// Heading.propTypes = {
//   size: PropTypes.number,
//   as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
// }
