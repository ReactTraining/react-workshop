import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStateProvider } from './state/AuthState'
import { ShoppingCartStateProvider } from './state/ShoppingCartState'
import App from './App'

ReactDOM.render(
  <AuthStateProvider>
    <ShoppingCartStateProvider>
      <App />
    </ShoppingCartStateProvider>
  </AuthStateProvider>,
  document.getElementById('root')
)
