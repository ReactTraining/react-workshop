import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { SearchBox } from 'workshop'
import SubNav from '../../ui/SubNav'
import { useShoppingCartState } from '../../state/ShoppingCartState'

// Pages
import BrowseProducts from './BrowseProducts'
import ProductProfile from './ProductProfile'

function Products() {
  const { cart } = useShoppingCartState()

  return (
    <div className="spacing">
      <SubNav>
        <Columns split middle>
          <Column>
            {Array.isArray(cart) && cart.length > 0 ? (
              <Link to="/checkout">Checkout ({cart.length} Items)</Link>
            ) : (
              <span>Cart is Empty</span>
            )}
          </Column>
          <Column>
            <div className="align-right">
              <SearchBox placeholder="Search Products" path="/products" />
            </div>
          </Column>
        </Columns>
      </SubNav>

      <Columns gutters>
        <Column size={10} className="primary-sidebar">
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
    </div>
  )
}

export default Products
