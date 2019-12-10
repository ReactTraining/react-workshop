import React from 'react'
import ReactDOM from 'react-dom'
import Quantity from './Quantity'
import 'workshop/styles/global-styles.scss'
import './styles.scss'

function App() {
  return <Quantity />
}

ReactDOM.render(<App />, document.getElementById('root'))
