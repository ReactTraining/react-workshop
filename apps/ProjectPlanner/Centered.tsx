import React from 'react'

type Props = {
  as?: string | React.ElementType
  size?: number
  className?: string
}

export const Centered: React.FC<Props> = ({
  as: Component = 'div',
  size = 30,
  children,
  ...rest
}) => {
  return (
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
}
