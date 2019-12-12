import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import 'YesterTech/styles/global-styles.scss'
import 'YesterTech/PrimaryLayout.scss'
import 'YesterTech/PrimaryHeader.scss'
import 'YesterTech/PrimaryFooter.scss'
import 'YesterTech/ProductsLayout.scss'
// import './styles.scss'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
