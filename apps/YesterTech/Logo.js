import React from 'react'
import { GoVersions } from 'react-icons/go'
import './Logo.scss'

function Logo() {
  return (
    <span className="logo vertical-middle">
      <GoVersions />{' '}
      <span>
        Yester<strong>Tech</strong>
      </span>
    </span>
  )
}

export default Logo
