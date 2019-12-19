import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  const [authorized, setAuthorized] = useState(false)
  return (
    <div>
      {authorized ? (
        <div className="align-center">You are logged in</div>
      ) : (
        <Login login={() => setAuthorized(true)} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
