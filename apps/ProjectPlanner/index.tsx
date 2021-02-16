import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'ProjectPlanner/AuthContext'
import { ThemeProvider } from 'ProjectPlanner/ThemeContext'
import { App } from 'ProjectPlanner/App'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'ProjectPlanner/styles/global-styles.scss'

const queryClient = new QueryClient()

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
