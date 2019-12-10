import React from 'react'
import SearchBox from 'YesterTech/SearchBox'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import SubNav from './SubNav'
import { useShoppingCartState } from './ShoppingCartState'

function ProductSubNav() {
  const { cart } = useShoppingCartState()

  return (
    <SubNav>
      <Columns split middle>
        <Column>
          {Array.isArray(cart) && cart.length > 0 ? (
            <Link to="/checkout">View Cart ({cart.length} Items)</Link>
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
  )
}

export default ProductSubNav
