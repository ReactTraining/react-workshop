import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from '~/AuthContext'
import { CoursesProvider } from '~/CoursesContext'
import { App } from '~/App'
import { queryClient } from '~/utils/queryClient'
import '~/styles/all.scss'

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
