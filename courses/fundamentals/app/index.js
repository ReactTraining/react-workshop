import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStateProvider } from './AuthState'
import { ShoppingCartStateProvider } from './ShoppingCartState'
import App from './App'

ReactDOM.render(
  <AuthStateProvider>
    <ShoppingCartStateProvider>
      <App />
    </ShoppingCartStateProvider>
  </AuthStateProvider>,
  document.getElementById('root')
)
