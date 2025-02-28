import { Link } from 'react-router'
import { Avatar } from '~/components/Avatar'
import { useAuth } from '~/state/AuthContext'

export function AuthenticatedUserNav() {
  const { user } = useAuth()

  return (
    <div>
      {user ? (
        <Avatar src={user.avatarUrl} />
      ) : (
        <Link
          to="/login"
          className="border-current border rounded-md text-sky-500 bg-black/20 px-4 py-2 shadow-md"
        >
          Login
        </Link>
      )}
    </div>
  )
}
