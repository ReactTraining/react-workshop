import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from 'ProjectPlanner/Logo'
import 'ProjectPlanner/PrimaryHeader.scss'

/**
 * Similar to PrimaryHeader but with no context. Used in lessons
 */

export const PrimaryHeader: React.FC = () => {
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
          </nav>
        </div>
      </div>
    </header>
  )
}
