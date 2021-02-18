import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from './PrimaryLayout'
import { UnauthenticatedLayout } from './UnauthenticatedLayout'
import { AuthProvider, useAuth } from './AuthContext'
import 'ProjectPlanner/styles/global-styles.scss'

const App = () => {
  const authenticated = false

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>{authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />}</AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
