import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

// Layouts
import { MainLayout } from '~/MainLayout'
import { VacationsSubLayout } from '~/VacationsSubLayout'
import { AccountSubLayout } from '~/AccountSubLayout'

// Pages
import { BrowseVacationsPage, loader as browseVacationsLoader } from './BrowseVacationsPage'
import { VacationDetailsPage, loader as vacationDetailsLoader } from './VacationDetailsPage'
import { LoginPage } from '~/LoginPage'
import { ErrorPage } from '~/ErrorPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={MainLayout}>
      <Route Component={VacationsSubLayout}>
        <Route
          index
          Component={BrowseVacationsPage}
          loader={browseVacationsLoader}
          errorElement={<ErrorPage />}
        />
        <Route path="vacations">
          <Route
            path=":vacationId"
            Component={VacationDetailsPage}
            loader={vacationDetailsLoader}
            errorElement={<ErrorPage />}
          />
          <Route path="deal-of-the-day" element={<Navigate to="../3" />} />
          <Route index element={<Navigate to="/" />} />
        </Route>
      </Route>
      <Route path="login" Component={LoginPage} />
      <Route path="account" Component={AccountSubLayout}>
        <Route index Component={AccountHome} />
      </Route>
      <Route path="*" Component={NotFoundPage} />
    </Route>
  )
)

export function App() {
  return <RouterProvider router={router} />
}
