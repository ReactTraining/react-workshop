import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import PrimaryLayout from 'YesterTech/PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <PrimaryLayout />
    </BrowserRouter>
  )
}

export default App
