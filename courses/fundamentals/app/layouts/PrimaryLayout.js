import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrimaryHeader from '../ui/PrimaryHeader'
import { useAuthState } from '../state/AuthState'
import './PrimaryLayout.scss'

// Pages and Sub Layouts
import Home from '../Home'
import Signup from '../signup/Signup'
import Account from '../account/Account'
import Products from '../products/Products'

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
            <Route path="/products" component={Products} />
            {authenticated && <Route path="/account" component={Account} />}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default PrimaryLayout
