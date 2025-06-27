import { Suspense, lazy } from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router'

// Layouts
import { MainLayout } from '~/MainLayout'
import { VacationsSubLayout } from '~/VacationsSubLayout'
import { AccountSubLayout } from '~/AccountSubLayout'

// Pages
import { BrowseVacationsPage } from './BrowseVacationsPage'
import { LoginPage } from '~/LoginPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

// import { VacationDetailsPage } from './VacationDetailsPage'

const VacationDetailsPage = lazy(() => import('./VacationDetailsPage'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<VacationsSubLayout />}>
        <Route index element={<BrowseVacationsPage />} />
        <Route path="vacations">
          <Route
            path=":vacationId"
            element={
              <Suspense fallback={<div>Loading More JS</div>}>
                <VacationDetailsPage />
              </Suspense>
            }
          />
          <Route path="deal-of-the-day" element={<Navigate to="../3" />} />
          <Route index element={<Navigate to="/" />} />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="account" element={<AccountSubLayout />}>
        <Route index element={<AccountHome />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export function App() {
  return <RouterProvider router={router} />
}
