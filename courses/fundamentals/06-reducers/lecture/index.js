import React from 'react'
import ReactDOM from 'react-dom'
import CheckoutBilling from './CheckoutBilling'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  return <CheckoutBilling onSubmit={fields => console.log(fields)} />
}

ReactDOM.render(<App />, document.getElementById('root'))
