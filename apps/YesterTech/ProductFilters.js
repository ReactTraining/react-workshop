import React, { useCallback } from 'react'

import api from 'YesterTech/api'
import usePromise from 'YesterTech/usePromise'
import ProductFilterList from 'YesterTech/ProductFilterList'

function ProductFilters() {
  const getMetaData = useCallback(api.products.getMetaData, [])
  const [meta, loading] = usePromise(getMetaData)
  if (loading) return null

  const conditions = ['excellent', 'good', 'fair', 'poor']

  return (
    <div className="spacing">
      <ProductFilterList list={meta?.categories} urlKey="categories" label="Categories" />
      <ProductFilterList list={meta?.brands} urlKey="brands" label="Brands" />
      <ProductFilterList list={conditions} urlKey="conditions" label="Conditions" />
    </div>
  )
}

export default ProductFilters
