import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { PrimaryHeader } from './PrimaryHeader'
import { PrimaryFooter } from './PrimaryFooter'
import './PrimaryLayout.scss'

// Route Targets
import { Dashboard } from './Dashboard'
import { BrowseBoards } from './BrowseBoards'
import { Board } from './Board'

export const PrimaryLayout: React.FC = () => {
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
            <Dashboard />
          </Route>
          <Route path="/boards" exact>
            <BrowseBoards />
          </Route>
          <Route path="/boards/:boardId" exact>
            <Board />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <PrimaryFooter />
    </div>
  )
}
