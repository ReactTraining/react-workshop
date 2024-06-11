import { Heading } from '~/Heading'
import { LessonCard } from '~/Lesson'
import { useAuthContext } from './AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { api } from '~/utils/api'

export function MyAccount() {
  const navigate = useNavigate()
  const { authenticated, user, logout } = useAuthContext()

  if (authenticated === false) {
    return <Navigate to="/login" replace />

    // Null means it's still pending with our system
  } else if (authenticated === null) {
    return <div>Loading...</div>
  }

  async function onLogout() {
    await api.auth.logout()
    logout()
    navigate('/')
  }

  return (
    <LessonCard>
      <Heading size={3}>My Account</Heading>
      <div>Welcome {user?.name}</div>
      <div>
        <button onClick={onLogout} className="button">
          Logout
        </button>
      </div>
    </LessonCard>
  )
}
