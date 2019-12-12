import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductsSidebar from 'YesterTech/ProductsSidebar'
import BrowseProducts from 'YesterTech/BrowseProducts'
import ProductProfile from 'YesterTech/ProductProfile'
import './ProductsLayout.scss'

function ProductsLayout() {
  return (
    <div className="products-layout">
      <ProductsSidebar />
      <div>
        <Switch>
          <Route path="/products" exact>
            <BrowseProducts />
          </Route>
          <Route path="/products/:productId">
            <ProductProfile />
          </Route>
          <Redirect to="/products" />
        </Switch>
      </div>
    </div>
  )
}

export default ProductsLayout
