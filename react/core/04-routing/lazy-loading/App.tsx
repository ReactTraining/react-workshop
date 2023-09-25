import { Suspense, lazy } from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { sleep } from '~/utils/helpers'

// Layouts
import { MainLayout } from './MainLayout'

// Pages
import { HomePage } from './HomePage'
import { PageOne } from './PageOne'

// Lazy Loaded Pages
const PageTwo = lazy(() => import('./PageTwo').then(sleep(1000)))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="one" element={<PageOne />} />
      <Route path="two" element={<PageTwo />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
