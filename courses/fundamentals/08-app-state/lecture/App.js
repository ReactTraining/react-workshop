import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ShoppingCartStateProvider } from 'YesterTech/ShoppingCartState'
import PrimaryLayout from './PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartStateProvider>
        <PrimaryLayout />
      </ShoppingCartStateProvider>
    </BrowserRouter>
  )
}

export default App
