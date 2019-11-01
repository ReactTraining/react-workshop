import React from 'react'
import classnames from 'classnames'
import './Avatar.scss'

function Avatar({ src, size = 3, className, ...rest }) {
  console.log(src)
  return (
    <img
      src={src}
      alt="Avatar"
      style={{ fontSize: `${size}em` }}
      className={classnames('avatar', className)}
      {...rest}
    />
  )
}

export default Avatar
