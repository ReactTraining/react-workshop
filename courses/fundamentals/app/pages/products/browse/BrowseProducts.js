import React, { useState, useEffect } from 'react'
import api from '../../../api'
import BrowseProductItem from './BrowseProductItem'
import { Heading } from 'workshop'

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
          <BrowseProductItem
            key={product.id}
            productId={product.id}
            name={product.name}
            imagePath={product.imagePath}
            year={product.year}
            brand={product.brand}
            category={product.category}
            condition={product.condition}
          />
        ))}
    </div>
  )
}

export default BrowseProducts
