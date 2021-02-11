import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button'
import { api } from 'ProjectPlanner/api'
import { Avatar } from 'ProjectPlanner/Avatar'
import { Logo } from 'ProjectPlanner/Logo'
import 'ProjectPlanner/PrimaryHeader.scss'

// This file uses AuthContext in a slightly different way than some lessons.
// So we're including the one we want (relative path) and not possibly a
// lesson one:
import { useAuth } from './AuthContext'

export const PrimaryHeader: React.FC = () => {
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    api.auth.logout()
  }

  function resetData() {
    if (!user) return
    api.users.resetAccountBoardData(user.accountId, user.id).then(() => {
      location.href = '/boards'
    })
  }

  return (
    <header className="primary-header spacing">
      <div className="flex-split">
        <div>
          <Logo />
        </div>
        <div>
          <nav className="horizontal-spacing-large align-right">
            <NavLink to="/" exact className="primary-nav-item">
              Dashboard
            </NavLink>
            <NavLink to="/boards" className="primary-nav-item">
              Boards
            </NavLink>
            <Menu>
              <MenuButton className="primary-nav-item reset-button">
                <Avatar src={user?.avatarUrl!} size={1.5} />
              </MenuButton>
              <MenuList className="nav-user-dropdown">
                {/* <MenuLink to="/account" as={Link}>
                  My Account
                </MenuLink> */}
                <MenuItem onSelect={handleLogout}>Logout</MenuItem>
                <MenuItem onSelect={resetData}>Reset Data</MenuItem>
              </MenuList>
            </Menu>
          </nav>
        </div>
      </div>
    </header>
  )
}
