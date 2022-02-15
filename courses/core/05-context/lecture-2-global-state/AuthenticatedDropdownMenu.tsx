import { useContext } from 'react'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
// import { useAuthContext } from './AuthContext'
// import { AuthContext } from './App'

// Temporary
type Props = {
  [key: string]: any
}

export function AuthenticatedDropdownMenu({ user, logout }: Props) {
  function onLogout() {
    api.auth.logout().then(logout)
  }

  return (
    <Menu>
      <MenuButton className="avatar-menu primary-nav-item">
        <Avatar src={user?.avatarUrl} size={2} />
      </MenuButton>
      <MenuList className="nav-user-dropdown">
        <MenuItem onSelect={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}
