import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthStateProvider } from 'ProjectPlanner/AuthState'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import { UnauthenticatedLayout } from 'ProjectPlanner/UnauthenticatedLayout'
import { useAuthState } from 'ProjectPlanner/AuthState'
import 'ProjectPlanner/styles/global-styles.scss'

const AppInContext: React.FC = () => {
  const { authenticated } = useAuthState()
  if (authenticated === null) return <div>Loading...</div>
  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <AppInContext />
      </AuthStateProvider>
    </BrowserRouter>
  )
}
