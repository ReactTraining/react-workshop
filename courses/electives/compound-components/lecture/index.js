import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import { Tabs } from './Tabs'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />
    },
    {
      label: 'Signup',
      content: <SignupForm />
    }
  ]

  return <Tabs data={tabData} />
}

ReactDOM.render(<App />, document.getElementById('root'))
