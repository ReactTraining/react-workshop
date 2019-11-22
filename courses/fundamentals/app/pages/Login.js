import React, { Fragment, useState } from 'react'
import { Heading, Notice, Centered } from 'workshop'
import VisuallyHidden from '@reach/visually-hidden'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { login } from '../utils/localStorage'
import useAuth from '../hooks/useAuth'
import api from '../api'

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
          <VisuallyHidden>
            <label htmlFor="login:username">Username</label>
          </VisuallyHidden>
          <input
            id="login:username"
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <VisuallyHidden>
            <label htmlFor="login:password">Password</label>
          </VisuallyHidden>
          <input
            id="login:password"
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <Fragment>
                <FaSignInAlt /> <span>Login</span>
              </Fragment>
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
