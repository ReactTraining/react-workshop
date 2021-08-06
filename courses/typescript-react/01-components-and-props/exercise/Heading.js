import React from 'react'
import classnames from 'classnames'
import 'YesterTech/Heading.scss'

const Heading = React.forwardRef(
  (
    {
      as: Component = 'h1',
      // Size can be between 1 & 4, only affects styling
      size = 1,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <Component ref={ref} className={classnames('heading', `size-${size}`, className)} {...rest} />
    )
  }
)

export default Heading
