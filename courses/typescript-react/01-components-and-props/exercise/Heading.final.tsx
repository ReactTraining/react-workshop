import * as React from 'react'
import classnames from 'classnames'
import 'YesterTech/Heading.scss'

const Heading: React.FC<HeadingProps> = React.forwardRef(
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

interface HeadingProps extends React.ComponentPropsWithRef<'h1'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 1 | 2 | 3 | 4
}

export default Heading
