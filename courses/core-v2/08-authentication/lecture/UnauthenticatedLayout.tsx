import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginForm } from 'ProjectPlanner/LoginForm'
import { SignupForm } from 'ProjectPlanner/SignupForm'
import { useAuth } from 'ProjectPlanner/AuthContext'
import 'ProjectPlanner/UnauthorizedLayout.scss'

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
