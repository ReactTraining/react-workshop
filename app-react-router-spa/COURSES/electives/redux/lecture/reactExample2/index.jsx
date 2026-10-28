import * as ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import { LessonBody, LessonCard } from '~/Lesson'
import store from './store'
import MainLayout from './MainLayout'
import BrowseVacationsPage from './BrowseVacationsPage'
import VacationDetailsPage from './VacationDetailsPage'
import LoginPage from './LoginPage'

// React Router is only used for routing here. All data (auth and vacations)
// lives in the Redux store
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={MainLayout}>
      <Route index Component={BrowseVacationsPage} />
      <Route path="vacations/:vacationId" Component={VacationDetailsPage} />
      <Route path="login" Component={LoginPage} />
    </Route>
  )
)

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
