import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from 'spa/AuthContext'
import { CoursesProvider } from 'spa/CoursesContext'
import { App } from 'spa/App'
import { queryClient } from 'spa/utils/queryClient'
import 'spa/styles/all.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CoursesProvider>
          <App />
        </CoursesProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
