import React from 'react'
import ReactDOM from 'react-dom'
import Products from './Products'

import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/PrimaryLayout.scss'
import './styles.scss'

function PrimaryLayout() {
  return (
    <div className="primary-layout">
      <div>
        <Products />
      </div>
    </div>
  )
}

ReactDOM.render(<PrimaryLayout />, document.getElementById('root'))
