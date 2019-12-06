import React from 'react'
import { GoVersions } from 'react-icons/go'
import './PrimaryFooter.scss'

function PrimaryFooter() {
  return (
    <div className="primary-footer">
      <GoVersions />
      <div>Copyright &copy; 2020 YesterTech Inc</div>
    </div>
  )
}

export default PrimaryFooter
