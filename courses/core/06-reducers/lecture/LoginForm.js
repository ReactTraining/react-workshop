import React, { useState, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function LoginForm({ onAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then(user => {
        if (typeof onAuthenticated === 'function') {
          onAuthenticated(user)
        }
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            aria-label="Username"
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => setShowPassword(!showPassword)}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
