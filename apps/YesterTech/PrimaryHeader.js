import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button'
import { MdShoppingCart } from 'react-icons/md'

import api from 'YesterTech/api'
import { useAuthState } from 'YesterTech/AuthState'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import Avatar from 'YesterTech/Avatar'
import Logo from 'YesterTech/Logo'
import 'YesterTech/PrimaryHeader.scss'
import '@reach/menu-button/styles.css'

function PrimaryHeader() {
  const { authenticated, user, dispatch } = useAuthState()
  const { getCartSize } = useShoppingCart()
  const cartSize = getCartSize()

  function handleLogout() {
    api.auth.logout().then(() => dispatch({ type: 'LOGOUT' }))
  }

  return (
    <div className="primary-header">
      <Columns gutters middle>
        <Column flex>
          <Link to="/" className="nav-logo">
            <Logo />
          </Link>
        </Column>
        <Column className="spacing-small vertical-middle">
          <nav className="horizontal-spacing-large align-right flex-parent flex-align-center">
            <NavLink to="/" exact className="primary-nav-item">
              Home
            </NavLink>
            <NavLink to="/products" className="primary-nav-item">
              Products
            </NavLink>
            {cartSize > 0 && (
              <NavLink to="/checkout" className="primary-nav-item nav-cart">
                <MdShoppingCart />
                <span className="label">{cartSize}</span>
              </NavLink>
            )}
            {authenticated ? (
              <Menu>
                <MenuButton className="primary-nav-item reset-button">
                  <Avatar src={user && user.avatarUrl} size={1.5} />
                </MenuButton>
                <MenuList className="nav-user-dropdown">
                  <MenuLink to="/account" as={Link}>
                    My Account
                  </MenuLink>
                  <MenuItem onSelect={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <NavLink to="/login" className="primary-nav-item">
                  Login
                </NavLink>
                <NavLink to="/signup" className="button">
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </Column>
      </Columns>
    </div>
  )
}

export default PrimaryHeader
