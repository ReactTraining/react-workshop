import React from 'react'
import { FiLayers } from 'react-icons/fi'
import './Logo.scss'

export const Logo: React.FC = () => (
  <span className="logo vertical-middle">
    <FiLayers />{' '}
    <span>
      Project<strong>Planner</strong>
    </span>
  </span>
)
