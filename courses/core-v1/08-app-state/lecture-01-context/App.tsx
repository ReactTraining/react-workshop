import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import { FavoriteProductProvider } from 'YesterTech/FavoriteProductState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <ShoppingCartProvider>
          <FavoriteProductProvider>
            <PrimaryLayout />
          </FavoriteProductProvider>
        </ShoppingCartProvider>
      </AuthStateProvider>
    </BrowserRouter>
  )
}

export default App
