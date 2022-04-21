import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { useAuthContext } from './AuthContext'

export function AuthenticatedDropdownMenu() {
  const { dispatch, user } = useAuthContext()

  function onLogout() {
    api.auth.logout().then(() => {
      dispatch({ type: 'LOGOUT' })
    })
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
