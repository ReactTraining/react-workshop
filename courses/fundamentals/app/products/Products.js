import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

// Pages
import BrowseProducts from './browse/BrowseProducts'
import ProductProfile from './profile/ProductProfile'

function Products() {
  return (
    <Columns gutters>
      <Column size={15} className="primary-sidebar">
        sidebar
      </Column>
      <Column flex>
        <main>
          <Switch>
            <Route path="/products" exact component={BrowseProducts} />
            <Route path="/products/:productId" component={ProductProfile} />
            <Redirect to="/products" />
          </Switch>
        </main>
      </Column>
    </Columns>
  )
}

export default Products
