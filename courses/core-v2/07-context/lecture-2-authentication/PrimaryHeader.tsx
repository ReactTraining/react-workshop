import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import { api } from 'ProjectPlanner/api'
import { Avatar } from 'ProjectPlanner/Avatar'
import { Logo } from 'ProjectPlanner/Logo'
import { useAuth } from './AuthContext'
import 'ProjectPlanner/PrimaryHeader.scss'

export const PrimaryHeader: React.FC = () => {
  const { user, dispatch } = useAuth()

  function handleLogout() {
    dispatch({ type: 'LOGOUT' })
    api.auth.logout()
  }

  return (
    <header className="primary-header spacing">
      <div className="flex-split">
        <div>
          <Logo />
        </div>
        <div>
          <nav className="horizontal-spacing-large">
            <NavLink to="/" exact className="primary-nav-item">
              Dashboard
            </NavLink>
            <NavLink to="/boards" className="primary-nav-item">
              Boards
            </NavLink>
            <Menu>
              <MenuButton className="avatar-menu primary-nav-item">
                <Avatar src={user?.avatarUrl!} size={1.5} />
              </MenuButton>
              <MenuList className="nav-user-dropdown">
                <MenuItem onSelect={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </nav>
        </div>
      </div>
    </header>
  )
}
