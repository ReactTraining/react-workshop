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

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
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

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
