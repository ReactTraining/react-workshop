import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { PrimaryHeader } from 'TaskMaker/PrimaryHeader'
import { PrimaryFooter } from 'TaskMaker/PrimaryFooter'
// import { useAuthState } from 'TaskMaker/AuthState'
import './PrimaryLayout.scss'

// Route Targets
import { Home } from './Home'
import { Board } from './Board'

export const PrimaryLayout: React.FC = () => {
  // const history = useHistory()
  // const { authenticated, dispatch } = useAuthState()
  const { key } = useLocation()

  // Scroll to the top of the page when pages change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])

  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main className="primary-content">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/boards/:boardId" exact>
            <Board />
          </Route>
          <Redirect from="/boards" to="/boards/1" />
          <Redirect to="/" />
        </Switch>
      </main>
      <PrimaryFooter />
    </div>
  )
}

export default PrimaryLayout
