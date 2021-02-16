import React from 'react'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import { UnauthenticatedLayout } from 'ProjectPlanner/UnauthenticatedLayout'

export const App: React.FC = () => {
  const { authenticated } = useAuth()
  if (authenticated === null) return <div>Loading...</div>
  return authenticated ? <PrimaryLayout /> : <UnauthenticatedLayout />
}
