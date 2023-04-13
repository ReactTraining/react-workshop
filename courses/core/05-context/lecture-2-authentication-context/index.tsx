import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'spa/App'
import { CoursesProvider } from 'spa/CoursesContext'
import { AuthProvider } from './AuthContext'
import 'spa/styles/all.scss'

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
