import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { AuthStateProvider } from 'TaskMaker/AuthState'
import { PrimaryLayout } from 'TaskMaker/PrimaryLayout'
import 'TaskMaker/styles/global-styles.scss'

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
