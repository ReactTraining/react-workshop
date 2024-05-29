import * as ReactDOM from 'react-dom/client'
// import { LoginForm } from './LoginForm.final'
import { LoginForm } from './LoginForm'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from './MainLayout'
import { MyAccount } from './MyAccount'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LoginForm />} />
      <Route path="account" element={<MyAccount />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

export function App() {
  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
