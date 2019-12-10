import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrimaryHeader from './PrimaryHeader'
import PrimaryFooter from './PrimaryFooter'
import useAuth from './useAuth'
import './PrimaryLayout.scss'

// Route Targets
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Account from './Account'
import Products from './Products'
import ProductSubNav from './ProductSubNav'
import Checkout from './Checkout'
import { useShoppingCartState } from './ShoppingCartState'

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
