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
import { VacationDetailsPage } from './VacationDetailsPage'
import { LoginPage } from '~/LoginPage'
import { NotFoundPage } from '~/NotFoundPage'
import { AccountHome } from '~/AccountHome'

// Lazy Loading Options:
// 1. React Way: https://react.dev/reference/react/lazy
//    React.lazy()
// 2. React Router Way: https://reactrouter.com/en/main/route/lazy
//    <Route path="a" lazy={() => import("./a")} />
//    Export names must match route props: Rename component to `export Component`

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route element={<VacationsSubLayout />}>
        <Route index element={<BrowseVacationsPage />} />
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

export function App() {
  return <RouterProvider router={router} />
}
