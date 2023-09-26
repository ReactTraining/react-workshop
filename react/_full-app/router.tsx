import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// Layouts
import { MainLayout } from '~/MainLayout'
import { VacationsSubLayout } from '~/VacationsSubLayout'
import { AccountSubLayout } from '~/AccountSubLayout'

// Pages
import { BrowseVacationsPage, loader as BrowseVacationsLoader } from '~/BrowseVacationsPage'
import { VacationDetailsPage, loader as VacationDetailsLoader } from '~/VacationDetailsPage'
import { LoginPage } from '~/LoginPage'
import { ErrorPage } from '~/ErrorPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={MainLayout}>
      <Route path="/" Component={VacationsSubLayout}>
        <Route index Component={BrowseVacationsPage} loader={BrowseVacationsLoader} />
      </Route>
      <Route path="vacations" Component={VacationsSubLayout}>
        <Route
          path=":vacationId"
          Component={VacationDetailsPage}
          loader={VacationDetailsLoader}
          errorElement={<ErrorPage />}
        />
        <Route path="deal-of-the-day" element={<Navigate to="../3" />} />
      </Route>
      <Route path="login" Component={LoginPage} />
      <Route path="account" Component={AccountSubLayout}>
        <Route index Component={AccountHome} />
      </Route>
      <Route path="*" Component={NotFoundPage} />
    </Route>
  )
)
