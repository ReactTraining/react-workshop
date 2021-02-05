import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from 'ProjectPlanner/AuthContext'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import { UnauthenticatedLayout } from 'ProjectPlanner/UnauthenticatedLayout'
import 'ProjectPlanner/styles/global-styles.scss'

const App: React.FC = () => {
  const { authenticated } = useAuth()
  if (authenticated === null) return <div>Loading...</div>
  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

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
