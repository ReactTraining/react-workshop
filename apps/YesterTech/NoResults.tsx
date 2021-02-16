import * as React from 'react'
import 'YesterTech/NoResults.scss'

const NoResults: React.FC = ({ children }) => (
  <div className="no-results">
    <div>{children}</div>
  </div>
)

export default NoResults
