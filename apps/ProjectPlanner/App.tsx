import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from 'ProjectPlanner/AuthContext'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import { UnauthenticatedLayout } from 'ProjectPlanner/UnauthenticatedLayout'
import 'ProjectPlanner/styles/global-styles.scss'

const AppInContext: React.FC = () => {
  const { authenticated } = useAuth()
  if (authenticated === null) return <div>Loading...</div>
  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppInContext />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
