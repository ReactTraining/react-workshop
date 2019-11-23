import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button'
import useAuth from '../hooks/useAuth'
import { Avatar } from 'workshop'
import Logo from '../ui/Logo'
import { logout } from '../utils/localStorage'
import './PrimaryHeader.scss'
import '@reach/menu-button/styles.css'

function PrimaryHeader() {
  const { authenticated, user, dispatch } = useAuth()

  function handleLogout() {
    logout()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className="primary-header">
      <Columns gutters middle>
        <Column flex>
          <NavLink to="/" exact className="nav-logo">
            <Logo />
          </NavLink>
        </Column>
        <Column className="spacing-small">
          <nav className="horizontal-spacing-large align-right">
            <NavLink to="/" exact className="primary-nav-item">
              Home
            </NavLink>
            <NavLink to="/products" className="primary-nav-item">
              Products
            </NavLink>
            {authenticated ? (
              <Menu>
                <MenuButton className="primary-nav-item reset-button">
                  <Avatar src={user && user.avatarUrl} size={1.5} />
                </MenuButton>
                <MenuList>
                  <MenuLink to="/account" as={Link}>
                    My Account
                  </MenuLink>
                  <MenuItem onSelect={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Fragment>
                <NavLink to="/login" className="primary-nav-item">
                  Login
                </NavLink>
                <NavLink to="/signup" className="button">
                  Signup
                </NavLink>
              </Fragment>
            )}
          </nav>
        </Column>
      </Columns>
    </div>
  )
}

export default PrimaryHeader
