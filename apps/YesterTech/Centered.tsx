import * as React from 'react'

interface CenteredProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: number
  as?: React.ElementType | React.ExoticComponent
}

const Centered: React.FC<CenteredProps> = ({
  as: Component = 'div',
  size = 30,
  children,
  ...rest
}) => (
  <Component
    style={{
      margin: `0 auto`,
      maxWidth: `${size}rem`,
    }}
    {...rest}
  >
    {children}
  </Component>
)

export default Centered
