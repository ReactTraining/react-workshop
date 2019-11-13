import React from 'react'
import './NoResults.scss'

function NoResults({ children }) {
  return (
    <div className="no-results">
      <div>{children}</div>
    </div>
  )
}

export default NoResults
