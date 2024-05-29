import * as ReactDOM from 'react-dom/client'
import { Groceries } from './Groceries'
import { Checkout } from './Checkout'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from './MainLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Groceries />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

export function App() {
  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
