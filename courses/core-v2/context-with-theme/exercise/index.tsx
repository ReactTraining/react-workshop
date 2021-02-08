import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'ProjectPlanner/AuthContext'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import 'ProjectPlanner/styles/global-styles.scss'

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <PrimaryLayout />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
