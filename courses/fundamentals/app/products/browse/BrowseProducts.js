import React, { useState, useEffect } from 'react'
import api from '../../api'
import BrowseProductItem from './BrowseProductItem'
import Heading from '../../ui/Heading'

function BrowseProducts() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProducts().then(products => {
      if (!isCurrent) return
      setProducts(products)
    })
    return () => (isCurrent = false)
  }, [])

  return (
    <div className="browse-products spacing">
      <Heading size={1}>Browse Products</Heading>
      {Array.isArray(products) &&
        products.map(product => (
          <BrowseProductItem key={product.id} productId={product.id} name={product.name} />
        ))}
    </div>
  )
}

export default BrowseProducts
