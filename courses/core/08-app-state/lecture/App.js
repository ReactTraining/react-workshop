import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import PrimaryLayout from './PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <ShoppingCartProvider>
          <PrimaryLayout />
        </ShoppingCartProvider>
      </AuthStateProvider>
    </BrowserRouter>
  )
}

export default App
