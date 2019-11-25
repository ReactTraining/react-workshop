import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import ProductFilters from '../../ui/ProductFilters'

// Pages
import BrowseProducts from './BrowseProducts'
import ProductProfile from './ProductProfile'

function Products() {
  return (
    <Columns gutters>
      <Column size={10} className="primary-sidebar">
        <ProductFilters />
      </Column>
      <Column flex>
        <Switch>
          <Route path="/products" exact component={BrowseProducts} />
          <Route path="/products/:productId" component={ProductProfile} />
          <Redirect to="/products" />
        </Switch>
      </Column>
    </Columns>
  )
}

export default Products
