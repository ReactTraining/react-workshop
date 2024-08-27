import * as ReactDOM from 'react-dom/client'
import { LoginForm } from './LoginForm'
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from './MainLayout'
import { MyAccount } from './MyAccount'
import { AuthProvider } from './AuthContext'
import { useAuthContext } from './AuthContext'

export function RequireAuthentication() {
  const { authenticated } = useAuthContext()

  if (authenticated === false) {
    return <Navigate to="/login" replace />

    // Null means it's still pending with our system
  } else if (authenticated === null) {
    return <div>Loading...</div>
  }
  return <Outlet />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LoginForm />} />
      <Route path="account" element={<RequireAuthentication />}>
        <Route index element={<MyAccount />}></Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

// Note to instructor: Demo how we might refactor the useEffect code from
// inside AuthProvider to be here in App instead. Note that login and logout
// functions aren't stable right now.

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

// Note to attendees: This is a hint for Task 1:

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//       <Route index element={<LoginForm />} />
//       <Route path="account" element={<RequireAuthentication />}>
//         <Route index element={<MyAccount />} />
//       </Route>
//       <Route path="*" element={<Navigate to="/" />} />
//     </Route>
//   )
// )
