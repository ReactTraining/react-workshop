import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'

import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/PrimaryLayout.scss'
import 'YesterTech/PrimaryHeader.scss'
import 'YesterTech/PrimaryFooter.scss'
import 'YesterTech/ProductsLayout.scss'

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <PrimaryLayout />
      </ShoppingCartProvider>
    </BrowserRouter>
  )
}

export default App
