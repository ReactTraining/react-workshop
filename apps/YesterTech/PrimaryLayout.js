import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'

import api from 'YesterTech/api'
import PrimaryHeader from 'YesterTech/PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import { useAuthState } from 'YesterTech/AuthState'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import Account from 'YesterTech/Account'
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'

function PrimaryLayout() {
  const history = useHistory()
  const { authenticated, dispatch } = useAuthState()
  const { cart } = useShoppingCart()
  const { key } = useLocation()

  // Get the authenticated user
  useEffect(() => {
    let isCurrent = true
    if (!authenticated) {
      api.auth.getAuthenticatedUser().then(user => {
        if (user && isCurrent) {
          dispatch({ type: 'LOGIN', user })
        }
      })
      return () => (isCurrent = false)
    }
  }, [authenticated, dispatch])

  // Scroll to the top of the page when pages change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])

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
                  dispatch({ type: 'LOGIN', user })
                  history.push('/products')
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={user => {
                  dispatch({ type: 'LOGIN', user })
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
