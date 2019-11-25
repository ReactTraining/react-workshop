import React from 'react'
import classnames from 'classnames'

import './ProductImage.scss'

function ProductImage({ name, size = 7, className, ...rest }) {
  return (
    <img
      className={classnames('product-image', className)}
      alt={name}
      style={{ fontSize: `${size}rem` }}
      {...rest}
    />
  )
}

export default ProductImage
