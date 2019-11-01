import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrimaryHeader from '../ui/PrimaryHeader'
import './AuthorizedLayout.scss'

// Pages and Sub Layouts
import Home from '../Home'
import Products from '../products/Products'

function AuthorizedLayout() {
  return (
    <div className="app-authorized-layout">
      <div>
        <PrimaryHeader />
        <div className="primary-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" component={Products} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default AuthorizedLayout
