import { Menu } from '@headlessui/react'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { Popover } from 'course-platform/PopoverX'
import { useAuthContext } from 'course-platform/AuthContext'

export function AuthenticatedDropdownMenu() {
  const { user, logout } = useAuthContext()

  function onLogout() {
    api.auth.logout().then(logout)
  }

  return (
    <Menu as="div" data-theme="light">
      <Menu.Button aria-label="My Account Menu">
        <Avatar src={user?.avatarUrl} size={2} />
      </Menu.Button>
      <Menu.Items className="dropdown-items" static>
        <Menu.Item>
          <button onClick={onLogout}>Logout</button>
        </Menu.Item>
        <Menu.Item>
          <a href="https://reacttraining.com/workshops">More Workshops</a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
