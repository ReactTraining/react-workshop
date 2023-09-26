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
import { VacationDetailsPage } from '~/VacationDetailsPage'
import { LoginPage } from '~/LoginPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

export function App() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<VacationsSubLayout />}>
        <Route index element={<BrowseVacationsPage />} />
      </Route>
      <Route path="vacations" element={<VacationsSubLayout />}>
        <Route path=":vacationId" element={<VacationDetailsPage />} />
        <Route path="deal-of-the-day" element={<Navigate to="../3" />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="account" element={<AccountSubLayout />}>
        <Route index element={<AccountHome />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)
