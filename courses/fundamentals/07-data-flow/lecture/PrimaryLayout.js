import React, { useState } from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import BrowseProducts from './BrowseProducts'
import Checkout from 'YesterTech/Checkout'
// import { useShoppingCart } from './ShoppingCartState'
import 'YesterTech/PrimaryLayout.scss'
import './styles.scss'

function PrimaryLayout() {
  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </header>
        <main className="primary-content">
          <Switch>
            <Route path="/products">
              <BrowseProducts />
            </Route>
            <Route path="/checkout">
              <Checkout cart={[]} />
            </Route>
            <Redirect to="/products" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default PrimaryLayout
