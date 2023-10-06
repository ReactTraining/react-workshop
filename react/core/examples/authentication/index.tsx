import { useEffect } from 'react'
import { api } from '~/utils/api'
import * as ReactDOM from 'react-dom/client'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { AuthProvider } from '~/AuthContext'
import { MainLayout } from './MainLayout'
import { AccountSubLayout } from './AccountSubLayout'
import { AccountHome } from '~/AccountHome'
import { LoginPage } from './LoginPage'
import { useAuthContext } from './AuthContext'

function App() {
  const { login, logout } = useAuthContext()

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        login(user)
      } else {
        logout()
      }
    })
    return () => {
      isCurrent = false
    }
  }, [login, logout])

  return <RouterProvider router={router} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="login" Component={LoginPage} />
      <Route path="account" Component={AccountSubLayout}>
        <Route index Component={AccountHome} />
        {/*
        
        All Protected by authentication (in AccountSubLayout)
        
        */}
      </Route>
      <Route index element={<Navigate to="/login" />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
