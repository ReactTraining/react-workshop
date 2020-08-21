import React, { useState, useEffect, useCallback } from 'react'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function useProduct(productId) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then(product => {
      if (!isCurrent) return
      setProduct(product)
    })
    return () => (isCurrent = false)
  }, [productId])

  return product
}

function ProductProfile({ productId }) {
  const product = useProduct(productId)

  if (!product) return <div>Loading...</div>

  return (
    <div className="spacing">
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

export default function App() {
  return (
    <div className="effects-in-custom-hooks">
      <ProductProfile productId={1} />
    </div>
  )
}
