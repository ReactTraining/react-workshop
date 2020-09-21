import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrimaryLayout from './PrimaryLayout'
import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import { FavoriteProductProvider } from 'YesterTech/FavoriteProductState'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

import { ThemeProvider } from './ThemeState'

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <ShoppingCartProvider>
          <FavoriteProductProvider>
            <ThemeProvider>
              <PrimaryLayout />
            </ThemeProvider>
          </FavoriteProductProvider>
        </ShoppingCartProvider>
      </AuthStateProvider>
    </BrowserRouter>
  )
}

export default App
