import React, { useEffect, useState } from 'react'

import api from 'YesterTech/api'
import Heading from 'YesterTech/Heading'
import BrowseProductItem from 'YesterTech/BrowseProductItem'
import ProductFilters from './ProductFilters'
import './styles.scss'

function Products() {
  const products = null
  const showSidebar = true

  return (
    <div className="products-page">
      {showSidebar && (
        <aside className="primary-sidebar spacing">
          <ProductFilters />
        </aside>
      )}
      <div className="spacing">
        <Heading>Browse Products</Heading>
        <div className="spacing">
          {Array.isArray(products) &&
            products.map(product => (
              <BrowseProductItem key={product.id} productId={product.id} {...product} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Products
