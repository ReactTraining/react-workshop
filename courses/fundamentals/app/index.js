import React from 'react'
import ReactDOM from 'react-dom'
import { AppStateProvider } from './state/AppState'
import App from './App'

ReactDOM.render(
  <AppStateProvider>
    <App />
  </AppStateProvider>,
  document.getElementById('root')
)
