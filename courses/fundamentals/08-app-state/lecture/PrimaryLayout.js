import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import { getLoggedUser } from 'YesterTech/localStorage'
// import useAuth from 'YesterTech/useAuth'
import PrimaryHeader from 'YesterTech/PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import Account from 'YesterTech/Account'
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCartState } from 'YesterTech/ShoppingCartState'

function PrimaryLayout() {
  const { cart } = useShoppingCartState()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (!authenticated) {
      const user = getLoggedUser()
      if (user) {
        setAuthenticated(true)
      }
    }
  }, [authenticated])

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
                  console.log(user)
                  // what now?
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={user => {
                  console.log(user)
                  // what now?
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
