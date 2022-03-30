import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from 'course-platform/AuthContext'
import { App } from 'course-platform/App'
import { queryClient } from './queryClient'
import 'course-platform/styles/all.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
