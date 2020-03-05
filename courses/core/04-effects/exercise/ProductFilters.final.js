import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

function ProductFilters() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let isCurrent = true
    getCategories().then(categories => {
      if (!isCurrent) return
      setCategories(categories)
    })
    return () => (isCurrent = false)
  }, [])

  if (!categories) return null

  return (
    <div className="spacing">
      <ProductFilterList
        list={categories}
        urlKey="categories"
        label="Categories"
      />
    </div>
  )
}

export default ProductFilters
