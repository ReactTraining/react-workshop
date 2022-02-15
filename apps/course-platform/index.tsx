import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from 'course-platform/AuthContext'
import { CoursesProvider } from 'course-platform/CoursesContext'
import { App } from 'course-platform/App'
import { queryClient } from 'course-platform/utils/queryClient'
import 'course-platform/styles/all.scss'

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
