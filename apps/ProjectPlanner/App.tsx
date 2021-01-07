import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { AuthStateProvider } from 'ProjectPlanner/AuthState'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import 'ProjectPlanner/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      {/* <AuthStateProvider> */}
      <PrimaryLayout />
      {/* </AuthStateProvider> */}
    </BrowserRouter>
  )
}

export default App
