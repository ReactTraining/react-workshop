import * as ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import { LessonBody, LessonCard } from '~/Lesson'
import { queryClient } from './queryClient'
import { AuthProvider } from './AuthContext'
import MainLayout from './MainLayout'
import BrowseVacationsPage, { loader as browseVacationsLoader } from './BrowseVacationsPage'
import VacationDetailsPage, {
  loader as vacationDetailsLoader,
  VacationDetailsError,
} from './VacationDetailsPage'
import LoginPage from './LoginPage'

// Auth (client state) lives in context. Vacations (server state) are fetched
// by route loaders and cached by TanStack Query
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={MainLayout} hydrateFallbackElement={<div>Loading...</div>}>
      <Route index Component={BrowseVacationsPage} loader={browseVacationsLoader} />
      <Route
        path="vacations/:vacationId"
        Component={VacationDetailsPage}
        loader={vacationDetailsLoader}
        errorElement={<VacationDetailsError />}
      />
      <Route path="login" Component={LoginPage} />
    </Route>
  )
)

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
