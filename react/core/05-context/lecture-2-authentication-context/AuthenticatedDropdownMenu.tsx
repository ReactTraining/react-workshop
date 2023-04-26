import { Menu } from '@headlessui/react'
import { api } from '~/utils/api'
import { Avatar } from '~/Avatar'
import { useAuthContext } from './AuthContext'

export function AuthenticatedDropdownMenu() {
  const { dispatch, user } = useAuthContext()

  function onLogout() {
    api.auth.logout().then(() => {
      dispatch({ type: 'LOGOUT' })
    })
  }

  return (
    <Menu as="div" className="dropdown-menu" data-theme="light">
      <Menu.Button aria-label="My Account Menu">
        <Avatar src={user?.avatarUrl} size={2} />
      </Menu.Button>
      <Menu.Items className="dropdown-items" static>
        <Menu.Item>
          <button onClick={onLogout}>Logout</button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
