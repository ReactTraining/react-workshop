import { lazy, Suspense } from 'react'

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
import { VacationDetailsPage } from '~/VacationDetailsPage'
import { LoginPage } from '~/LoginPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

const BrowseVacationsPage = lazy(() => import('./BrowseVacationsPage'))

export function App() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<VacationsSubLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<div>loading...</div>}>
              <BrowseVacationsPage />
            </Suspense>
          }
        />
        <Route path="vacations">
          <Route path=":vacationId" element={<VacationDetailsPage />} />
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

// function VacationDetailsPage() {
//   useParams() // { vacationId: a }

// }
