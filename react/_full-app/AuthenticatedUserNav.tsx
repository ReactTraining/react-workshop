import { Link } from 'react-router-dom'
import { Avatar } from '~/Avatar'
import { useAuthContext } from '~/AuthContext'

export function AuthenticatedUserNav() {
  const { user } = useAuthContext()
  console.log(user)

  return <div>{user ? <Avatar src={user.avatarUrl || ''} /> : <Link to="/login">Login</Link>}</div>
}
