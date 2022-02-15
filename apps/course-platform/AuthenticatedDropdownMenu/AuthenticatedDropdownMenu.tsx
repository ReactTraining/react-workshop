import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button'
import { api } from 'course-platform/utils/api'
import { Avatar } from 'course-platform/Avatar'
import { useAuthContext } from 'course-platform/AuthContext'

export function AuthenticatedDropdownMenu() {
  const { user, logout } = useAuthContext()

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
        {/* <MenuItem onSelect={resetData}>Reset Database Boards</MenuItem> */}
        <MenuLink href="https://reacttraining.com/workshops">More Workshops</MenuLink>
      </MenuList>
    </Menu>
  )
}
