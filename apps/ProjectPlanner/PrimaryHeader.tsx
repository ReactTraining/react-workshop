import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button'
import api from './api'
import { Avatar } from './Avatar'
import { Logo } from './Logo'
import { useAuth } from './AuthContext'
import './PrimaryHeader.scss'

export const PrimaryHeader: React.FC = () => {
  const { user, logout } = useAuth()

  function handleLogout() {
    api.auth.logout().then(logout)
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
              </MenuList>
            </Menu>
          </nav>
        </div>
      </div>
    </header>
  )
}
