import React from 'react'

function Centered({ as: Component = 'div', size = 30, children, ...rest }) {
  return (
    <Component
      style={{
        margin: `0 auto`,
        maxWidth: `${size}rem`
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Centered
