import React, { useState, useEffect } from 'react'

import { getCategories } from './utils'
import ProductFilterList from 'YesterTech/ProductFilterList'

function ProductFilters() {
  const categories = null

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
}

export default ProductFilters
