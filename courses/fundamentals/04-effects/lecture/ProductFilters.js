import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import api from 'YesterTech/api'

function ProductFilters() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getMetaData().then(meta => {
      if (!isCurrent) return
      setCategories(meta.categories)
    })
    return () => (isCurrent = false)
  }, [])

  if (!categories) return null

  return <ProductFilterList list={categories} urlKey="categories" label="Categories" />
}

export default ProductFilters
