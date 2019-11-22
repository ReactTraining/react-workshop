import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { Columns, Column } from 'react-flex-columns'
import { Heading } from 'workshop'
import ProductImage from '../ui/ProductImage'

function ProductTile({ productId }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then(product => {
      if (!isCurrent) return
      setProduct(product)
    })
    return () => (isCurrent = false)
  }, [productId])

  if (!product) return null

  return (
    <div className="product-tile">
      <Columns gutterSize={0.5}>
        <Column>
          <ProductImage src={product.imagePath} name={product && product.name} size={5} />
        </Column>
        <Column flex className="spacing-small">
          <Heading as="h2" size={4} className="confine">
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
