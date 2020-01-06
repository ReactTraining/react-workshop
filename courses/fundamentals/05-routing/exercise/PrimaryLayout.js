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
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import { useShoppingCartState } from 'YesterTech/ShoppingCartState'

export default function PrimaryLayout() {
  const { authenticated } = useAuth()
  const { cart } = useShoppingCartState()

  // Use these values to conditionally render some of the routes
  console.log(authenticated, cart.length)

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <ProductSubNav />
        <main className="primary-content">
          <Home />
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}
