import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { api } from '~/utils/api'
import { Avatar } from '~/Avatar'
import { useAuthContext } from '~/AuthContext'

export function AuthenticatedUserNav() {
  const { user, logout } = useAuthContext()

  function onLogout() {
    api.auth.logout().then(logout)
  }

  return (
    <Menu as="div" className="dropdown-menu" data-theme="light">
      <Menu.Button aria-label="My Account Menu">
        {user ? <Avatar src={user.avatarUrl || ''} /> : <Link to="/login">Login</Link>}
      </Menu.Button>
      <Menu.Items
        className="dropdown-items rounded-md shadow-lg p-3 bg-white border border-slate-200/60"
        static
      >
        <Menu.Item>
          <button onClick={onLogout}>Logout</button>
        </Menu.Item>
        <Menu.Item>
          <a href="https://reacttraining.com/workshops">More Workshops</a>
        </Menu.Item>
        <Menu.Item>
          <a href="https://github.com/ReactTraining/react-workshop/blob/main/docs/post-workshop-materials.md">
            Post Workshop Reading Material
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
