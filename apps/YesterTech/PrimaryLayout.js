import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrimaryHeader from 'YesterTech/PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import useAuth from 'YesterTech/useAuth'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import Signup from 'YesterTech/Signup'
import Login from 'YesterTech/Login'
import Account from 'YesterTech/Account'
import Products from 'YesterTech/Products'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCartState } from 'YesterTech/ShoppingCartState'

function PrimaryLayout() {
  const { authenticated } = useAuth()
  const { cart } = useShoppingCartState()

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products" component={ProductSubNav} />
        <main className="primary-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/products" component={Products} />
            {cart.length > 0 && <Route path="/checkout" component={Checkout} />}
            {authenticated && <Route path="/account" component={Account} />}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
