import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrimaryHeader from '../ui/PrimaryHeader'
import useAuth from '../hooks/useAuth'
import './PrimaryLayout.scss'

// Pages and Sub Layouts
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Account from '../pages/account/Account'
import Products from '../pages/products/Products'
import Checkout from '../pages/Checkout'

function PrimaryLayout() {
  const { authenticated } = useAuth()

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <div className="primary-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/products" component={Products} />
            <Route path="/checkout" component={Checkout} />
            {authenticated && <Route path="/account" component={Account} />}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default PrimaryLayout
