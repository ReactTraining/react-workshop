import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'course-platform/App'
import { CoursesProvider } from 'course-platform/CoursesContext'
import 'course-platform/styles/all.scss'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <CoursesProvider>
      <App />
    </CoursesProvider>
  </BrowserRouter>
)
