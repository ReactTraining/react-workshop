import React from 'react'

function Centered({ as: Component = 'div', size = 30, children }) {
  return (
    <Component
      style={{
        margin: `0 auto`,
        maxWidth: `${size}rem`,
      }}
    >
      {children}
    </Component>
  )
}

export default Centered
