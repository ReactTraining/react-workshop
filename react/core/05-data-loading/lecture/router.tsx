import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// Layouts
import { MainLayout } from '~/MainLayout'
import { VacationsSubLayout } from '~/VacationsSubLayout'

// Pages
import { BrowseVacationsPage, loader as BrowseVacationsLoader } from '~/BrowseVacationsPage'
import { VacationDetailsPage } from './VacationDetailsPage'
import { ErrorPage } from '~/ErrorPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={MainLayout}>
      <Route path="/" Component={VacationsSubLayout}>
        <Route index Component={BrowseVacationsPage} loader={BrowseVacationsLoader} />
      </Route>
      <Route path="vacations" Component={VacationsSubLayout}>
        <Route path=":vacationId" Component={VacationDetailsPage} errorElement={<ErrorPage />} />
      </Route>
    </Route>
  )
)
