import React, { useState, useEffect } from 'react'
import { Columns, Column } from 'react-flex-columns'
import api from '../../api'
import Heading from '../../ui/Heading'
import ProductImage from '../../ui/ProductImage'

function ProductProfile({ match }) {
  const { productId } = match.params
  const [product, setProduct] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then(product => {
      if (!isCurrent) return
      setProduct(product)
    })
    return () => (isCurrent = false)
  }, [productId])

  return (
    <div className="product-profile spacing">
      <Heading>Product Profile</Heading>
      <Columns gutters>
        <Column size={8}>
          <ProductImage
            src="https://avatars0.githubusercontent.com/u/2272118?s=460&v=4"
            name={product && product.name}
          />
        </Column>
        <Column flex>...</Column>
      </Columns>
    </div>
  )
}

export default ProductProfile
