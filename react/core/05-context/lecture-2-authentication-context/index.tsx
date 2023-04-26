import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '~/App'
import { CoursesProvider } from '~/CoursesContext'
import { AuthProvider } from './AuthContext'
import '~/styles/all.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <AuthProvider>
      <CoursesProvider>
        <App />
      </CoursesProvider>
    </AuthProvider>
  </BrowserRouter>
)
