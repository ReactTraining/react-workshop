import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'
import 'YesterTech/styles/center-lesson.scss'

function useProduct(productId) {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then(products => {
      if (!isCurrent) return
      setProducts(products)
    })
    return () => (isCurrent = false)
  }, [productId])

  return products
}

function ProductProfile({ productId }) {
  const product = useProduct(productId)

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

ReactDOM.render(
  <ProductProfile productId={1} />,
  document.getElementById('root')
)
