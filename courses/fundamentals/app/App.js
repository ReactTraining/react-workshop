import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrimaryLayout from './PrimaryLayout'
import 'workshop/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={PrimaryLayout} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
