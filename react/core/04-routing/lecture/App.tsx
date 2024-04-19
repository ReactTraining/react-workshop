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
import { BrowseVacationsPage } from '~/BrowseVacationsPage'
import { LoginPage } from '~/LoginPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

const VacationDetailsPage = lazy(() => import('./VacationDetailsPage'))

export function App() {
  return <RouterProvider router={router} />
}

// x6
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<VacationsSubLayout />}>
        <Route index element={<BrowseVacationsPage />} />
        <Route path="vacations">
          <Route index element={<div>this is the vacations page</div>} />
          <Route
            path=":vacationId"
            element={
              <Suspense fallback={<div>loading more javascript...</div>}>
                <VacationDetailsPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="account" element={<AccountSubLayout />}>
        <Route index element={<AccountHome />} />
        <Route path="settings" element={<div>Account Settings</div>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)
