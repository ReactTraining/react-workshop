import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginForm } from 'ProjectPlanner/LoginForm'
import { SignupForm } from 'ProjectPlanner/SignupForm'
import 'ProjectPlanner/UnauthorizedLayout.scss'

// This file uses AuthContext in a slightly different way than some lessons.
// So we're including the one we want (relative path) and not possibly a
// lesson one:
import { useAuth } from './AuthContext'

export const UnauthenticatedLayout: React.FC = () => {
  const { login } = useAuth()

  return (
    <div className="unauthorized-layout">
      <div>
        <Switch>
          <Route path="/login">
            <LoginForm onAuthenticated={login} />
          </Route>
          <Route path="/signup">
            <SignupForm onAuthenticated={login} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  )
}
