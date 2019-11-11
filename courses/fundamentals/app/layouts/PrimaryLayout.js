import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrimaryHeader from '../ui/PrimaryHeader'
import { useAuthState } from '../state/AuthState'
import './PrimaryLayout.scss'

// Pages and Sub Layouts
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Account from '../pages/account/Account'
import Products from '../pages/products/Products'
import Cart from '../pages/Cart'

function PrimaryLayout() {
  const { authenticated } = useAuthState()

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
            <Route path="/cart" component={Cart} />
            {authenticated && <Route path="/account" component={Account} />}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default PrimaryLayout
