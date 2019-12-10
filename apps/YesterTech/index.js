import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStateProvider } from 'YesterTech/AuthState'
import { ShoppingCartStateProvider } from 'YesterTech/ShoppingCartState'
import App from 'YesterTech/App'

ReactDOM.render(
  <AuthStateProvider>
    <ShoppingCartStateProvider>
      <App />
    </ShoppingCartStateProvider>
  </AuthStateProvider>,
  document.getElementById('root')
)
