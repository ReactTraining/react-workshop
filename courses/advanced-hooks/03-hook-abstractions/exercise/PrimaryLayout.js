import * as React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import BrowseProducts from 'YesterTech/BrowseProducts'
import Reviews from './Reviews'
import 'YesterTech/PrimaryLayout.scss'

function PrimaryLayout() {
  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header">
          <NavLink to="/" exact>
            Products
          </NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
        </header>
        <main className="primary-content">
          <Switch>
            <Route path="/" exact>
              <BrowseProducts />
            </Route>
            <Route path="/reviews">
              <Reviews />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default PrimaryLayout
