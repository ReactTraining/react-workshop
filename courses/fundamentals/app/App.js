import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import UnauthorizedLayout from './layouts/UnauthorizedLayout'
import AuthorizedLayout from './layouts/AuthorizedLayout'
import { useAppState } from './state/AppState'
import 'workshop/styles/global-styles.scss'

function App() {
  const { authenticated } = useAppState()

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={UnauthorizedLayout} />
        {authenticated && <Route path="/" component={AuthorizedLayout} />}
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
