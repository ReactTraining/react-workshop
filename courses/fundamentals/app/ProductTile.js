import React from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { Heading } from 'workshop'

import ProductImage from './ProductImage'
import useProduct from './useProduct'

function ProductTile({ productId }) {
  const product = useProduct(productId)

  if (!product) return null

  return (
    <div className="product-tile">
      <Columns gutterSize={0.5}>
        <Column>
          <ProductImage src={product.imagePath} name={product && product.name} size={5} />
        </Column>
        <Column flex className="spacing-small">
          <Heading as="h2" size={4} className="no-wrap">
            {product.name}
          </Heading>
          <div className="text-small">
            <Link to={`/products/${productId}`}>View Product</Link>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

export default ProductTile
