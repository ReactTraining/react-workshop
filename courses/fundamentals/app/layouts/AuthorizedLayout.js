import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Browse from '../browse/Browse'
import PrimaryHeader from '../ui/PrimaryHeader'
import PrimarySidebar from '../ui/PrimarySidebar'
import './AuthorizedLayout.scss'

function AuthorizedLayout() {
  return (
    <div className="app-authorized-layout">
      <div>
        <PrimaryHeader />
        <div className="primary-content">
          <PrimarySidebar></PrimarySidebar>
          <main>
            <Switch>
              <Route path="/browse" component={Browse} />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AuthorizedLayout
