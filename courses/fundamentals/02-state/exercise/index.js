import React from 'react'
import ReactDOM from 'react-dom'
import CheckoutBilling from './CheckoutBilling'
// import CheckoutBilling from './CheckoutBilling.final'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

ReactDOM.render(
  <CheckoutBilling onSubmit={fields => console.log(fields)} />,
  document.getElementById('root')
)
