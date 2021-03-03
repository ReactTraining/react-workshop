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
    api.users.resetAccountBoardData(user.id).then(() => {
      window.location.href = '/boards'
    })
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
                <MenuItem onSelect={resetData}>Reset Database Boards</MenuItem>
                <MenuLink href="https://reacttraining.com/workshops" as="a">
                  More Workshops
                </MenuLink>
              </MenuList>
            </Menu>
          </nav>
        </div>
      </div>
    </header>
  )
}
