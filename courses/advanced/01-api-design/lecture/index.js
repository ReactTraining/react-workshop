import React from 'react'
import ReactDOM from 'react-dom'
import { Disclosure } from './Disclosure'
import './styles.scss'

function App() {
  return <Disclosure summary="Click Me">Panel Contents</Disclosure>
}

ReactDOM.render(<App />, document.getElementById('root'))
