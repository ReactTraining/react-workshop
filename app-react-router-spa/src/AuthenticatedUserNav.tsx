import { Link } from 'react-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
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
      <MenuButton aria-label="My Account Menu">
        {user ? <Avatar src={user.avatarUrl || ''} /> : <Link to="/login">Login</Link>}
      </MenuButton>
      <MenuItems
        className="dropdown-items rounded-md shadow-lg p-3 bg-white border border-slate-200/60"
        static
      >
        <MenuItem>
          <button onClick={onLogout}>Logout</button>
        </MenuItem>
        <MenuItem>
          <a href="https://reacttraining.com/workshops">More Workshops</a>
        </MenuItem>
        <MenuItem>
          <a href="https://github.com/ReactTraining/react-workshop/blob/main/docs/post-workshop-materials.md">
            Post Workshop Reading Material
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
