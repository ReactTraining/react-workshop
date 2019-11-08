import React from 'react'
import ReactDOM from 'react-dom'
import { AuthStateProvider } from './state/AuthState'
import App from './App'

ReactDOM.render(
  <AuthStateProvider>
    <App />
  </AuthStateProvider>,
  document.getElementById('root')
)
