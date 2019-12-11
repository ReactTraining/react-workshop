import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Products from './Products'
import Centered from 'YesterTech/Centered'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <Centered size={50}>
        <Products />
      </Centered>
    </BrowserRouter>
  )
}

export default App
