import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import { UnauthenticatedLayout } from 'ProjectPlanner/UnauthenticatedLayout'
import { AuthProvider, useAuth } from './AuthContext'
import 'ProjectPlanner/styles/global-styles.scss'

const App = () => {
  const authenticated = false

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AuthProvider>
            {authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />}
          </AuthProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
