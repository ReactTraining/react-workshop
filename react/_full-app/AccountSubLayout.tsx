import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '~/AuthContext'

export function AccountSubLayout() {
  const { authenticated } = useAuthContext()
  const navigate = useNavigate()

  if (authenticated === false) {
    navigate('/login')
  }

  return (
    <div className="flex -m-3">
      <aside className="w-80 bg-white border-r p-6">aside</aside>
      <div className="flex-1 p-3">
        <Outlet />
      </div>
    </div>
  )
}
