import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from '~/AuthContext'
import { App } from 'react2/_full-app/src/App'
import { queryClient } from './queryClient'
import '~/styles/all.scss'

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
