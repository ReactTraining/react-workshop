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
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 1 | 2 | 3 | 4
}

export default Heading
