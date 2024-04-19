import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '~/AuthContext'
import { AccountSidebar } from '~/AccountSidebar'

export function AccountSubLayout() {
  const { authenticated } = useAuthContext()

  if (authenticated === false) {
    return <Navigate to="/login" replace />

    // Null means it's still pending with our system
  } else if (authenticated === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex -m-3">
      <AccountSidebar />
      <div className="flex-1 p-3">here</div>
    </div>
  )
}
