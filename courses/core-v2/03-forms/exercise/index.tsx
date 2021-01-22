import React from 'react'
import ReactDOM from 'react-dom'
import { LoginForm } from './LoginForm'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  return <LoginForm />
}

ReactDOM.render(<App />, document.getElementById('root'))
