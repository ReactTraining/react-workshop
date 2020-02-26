import React from 'react'
import ReactDOM from 'react-dom'
import CheckoutBilling from './CheckoutBilling'
// import CheckoutBilling from './CheckoutBilling.final'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

ReactDOM.render(
  <CheckoutBilling
    onSubmit={(sameAsBilling, fields) =>
      console.log(sameAsBilling, fields)
    }
  />,
  document.getElementById('root')
)
