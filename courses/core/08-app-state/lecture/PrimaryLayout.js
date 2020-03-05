import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import api from 'YesterTech/api'
import PrimaryHeader from './PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import { useAuthState } from 'YesterTech/AuthState'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import Account from 'YesterTech/Account'
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'

function PrimaryLayout() {
  const history = useHistory()
  const { cart } = useShoppingCart()
  const { authenticated, dispatch } = useAuthState()

  // Get the current authenticated user (for first loads and refreshes)
  useEffect(() => {
    // api.auth.getAuthenticatedUser().then(user => {})
  }, [])

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <main className="primary-content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/signup" exact>
              <SignupForm
                onSignup={user => {
                  // dispatch login so the frontend is aware
                  // then redirect:
                  history.push('/')
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={user => {
                  // dispatch login so the frontend is aware
                  // then redirect:
                  history.push('/')
                }}
              />
            </Route>
            <Route path="/products">
              <ProductsLayout />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout />
              </Route>
            )}
            {authenticated && (
              <Route path="/account">
                <Account />
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
