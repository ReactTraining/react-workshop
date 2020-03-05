import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      {user ? (
        <div className="align-center">You are logged in</div>
      ) : (
        <LoginForm onAuthenticated={setUser} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
