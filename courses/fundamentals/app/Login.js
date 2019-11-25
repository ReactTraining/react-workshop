import React, { useState } from 'react'
import { Heading, Notice, Centered } from 'workshop'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { login } from './localStorage'
import useAuth from './useAuth'
import api from './api'

function Login({ history }) {
  const { dispatch } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then(user => {
        login(user)
        dispatch({ type: 'LOGIN', user })
        history.push('/')
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
            type="password"
            placeholder="Password"
          />
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

export default Login
