import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrimaryHeader from '../ui/PrimaryHeader'
import useAuth from '../hooks/useAuth'
import './PrimaryLayout.scss'

// Route Targets
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Account from '../pages/account/Account'
import Products from '../pages/products/Products'
import ProductSubNav from '../ui/ProductSubNav'
import Checkout from '../pages/checkout/Checkout'
import { useShoppingCartState } from '../state/ShoppingCartState'

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
      </div>
    </div>
  )
}

export default PrimaryLayout
