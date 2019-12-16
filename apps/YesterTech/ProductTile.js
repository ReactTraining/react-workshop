import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import Heading from 'YesterTech/Heading'
import ProductImage from 'YesterTech/ProductImage'
import usePromise from 'YesterTech/usePromise'
import api from 'YesterTech/api'

function ProductTile({ productId }) {
  const getProduct = useCallback(() => api.products.getProduct(productId), [productId])
  const [product] = usePromise(getProduct)

  if (!product) return null

  return (
    <div className="product-tile">
      <Columns gutterSize={0.5}>
        <Column>
          <ProductImage src={product.imagePath} alt={product && product.name} size={5} />
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
