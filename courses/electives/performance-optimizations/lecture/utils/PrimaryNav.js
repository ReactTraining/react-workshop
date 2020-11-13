import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PrimaryNav() {
  return (
    <nav className="horizontal-spacing">
      <NavLink to="/" exact className="primary-nav-item">
        Home
      </NavLink>
      <NavLink to="/product" className="primary-nav-item">
        Product Profile
      </NavLink>
      <NavLink to="/account" className="primary-nav-item">
        Account
      </NavLink>
    </nav>
  )
}
