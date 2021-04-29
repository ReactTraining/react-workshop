import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartProvider } from 'YesterTech/ShoppingCartState'
import { FavoriteProductProvider } from 'YesterTech/FavoriteProductState'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'

import { observer } from 'mobx-react-lite'

const Observed = observer(() => {
  return (
    <ShoppingCartProvider>
      <FavoriteProductProvider>
        <PrimaryLayout />
      </FavoriteProductProvider>
    </ShoppingCartProvider>
  )
})

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <Observed />
      </AuthStateProvider>
    </BrowserRouter>
  )
}

export default App
