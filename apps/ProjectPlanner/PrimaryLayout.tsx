import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { PrimaryHeader } from 'ProjectPlanner/PrimaryHeader'
import { PrimaryFooter } from 'ProjectPlanner/PrimaryFooter'
import 'ProjectPlanner/PrimaryLayout.scss'

// Route Targets
import { Dashboard } from 'ProjectPlanner/Dashboard'
import { BrowseBoards } from 'ProjectPlanner/BrowseBoards'
import { Board } from 'ProjectPlanner/Board'
import { UserProfile } from 'ProjectPlanner/UserProfile'
import { NotFound } from 'ProjectPlanner/NotFound'

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
          <Route path="/users/:userId" exact>
            <UserProfile />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <PrimaryFooter />
    </div>
  )
}
