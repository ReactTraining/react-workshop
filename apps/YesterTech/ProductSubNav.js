import React from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import SearchBox from 'YesterTech/SearchBox'
import SubNav from 'YesterTech/SubNav'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'

function ProductSubNav() {
  const { getCartSize } = useShoppingCart()
  const cartSize = getCartSize()

  return (
    <SubNav>
      <Columns split middle>
        <Column>
          {cartSize ? (
            <Link to="/checkout">View Cart ({cartSize})</Link>
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
