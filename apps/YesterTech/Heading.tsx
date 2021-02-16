import * as React from 'react'
import classnames from 'classnames'

import 'YesterTech/Heading.scss'

const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h1',
  size = 1,
  className,
  ...rest
}) => <Component className={classnames('heading', `size-${size}`, className)} {...rest} />

interface HeadingProps extends React.ComponentPropsWithoutRef<'h1'> {
  as?: any
  size?: number
}

export default Heading
