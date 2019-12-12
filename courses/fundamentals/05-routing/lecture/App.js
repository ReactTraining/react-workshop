import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrimaryLayout from 'YesterTech/PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/PrimaryLayout.scss'
import 'YesterTech/PrimaryHeader.scss'
import 'YesterTech/PrimaryFooter.scss'
import 'YesterTech/ProductsLayout.scss'

function App() {
  return (
    <BrowserRouter>
      <PrimaryLayout />
    </BrowserRouter>
  )
}

export default App
