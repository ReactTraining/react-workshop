import React from 'react'
import classnames from 'classnames'
import './ProductImage.scss'

function ProductImage({ name, className, ...rest }) {
  return <img className={classnames('product-image', className)} alt={name} {...rest} />
}

export default ProductImage
