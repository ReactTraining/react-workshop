import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrimaryLayout from 'YesterTech/PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

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
