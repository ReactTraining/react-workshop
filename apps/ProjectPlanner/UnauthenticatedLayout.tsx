import React from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuthState } from './AuthState'
import './UnauthorizedLayout.scss'

export const UnauthenticatedLayout: React.FC = () => {
  const { login } = useAuthState()

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
