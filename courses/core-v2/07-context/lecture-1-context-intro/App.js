import React, { useContext, useState, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { api } from 'ProjectPlanner/api'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { Notice } from 'ProjectPlanner/Notice'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

/**
 * This is JS and not TS on purpose to help explain context
 * without the extra noise TS brings to it:
 * https://reacttraining.com/blog/react-context-with-typescript/
 */

export const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        setUser(user)
      }
    })
    return () => (isCurrent = false)
  }, [])

  return user ? (
    <PrimaryLayout user={user} setUser={setUser} />
  ) : (
    <UnauthenticatedLayout setUser={setUser} />
  )
}

const PrimaryLayout = ({ user, setUser }) => {
  function logout() {
    api.auth.logout().then(() => {
      setUser(null)
    })
  }

  return (
    <div className="card spacing">
      <Heading>Welcome {user.name}</Heading>
      <div>
        <button onClick={logout} className="button">
          Logout
        </button>
      </div>
    </div>
  )
}

const UnauthenticatedLayout = ({ setUser }) => {
  function login(user) {
    setUser(user)
  }

  return (
    <div className="card spacing">
      <LoginForm onAuthenticated={login} />
    </div>
  )
}

export const LoginForm = ({ onAuthenticated }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then((user) => {
        onAuthenticated(user)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <>
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div>
          <input
            required
            className="form-field"
            aria-label="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            required
            className="form-field"
            aria-label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              className="passwordCheckbox"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
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
    </>
  )
}
