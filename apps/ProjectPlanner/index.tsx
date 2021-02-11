import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'ProjectPlanner/AuthContext'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { App } from 'ProjectPlanner/App'
import 'ProjectPlanner/styles/global-styles.scss'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
