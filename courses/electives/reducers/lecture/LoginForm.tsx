// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'
import { UserNoPassword } from 'YesterTech/types'

interface LoginFormProps {
  onAuthenticated?(user: any): any
}

function LoginForm({ onAuthenticated }: LoginFormProps): React.ReactElement {
  const usernameRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  // Change to reducer, then state machine
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<any>(null)
  const [user, setUser] = React.useState<UserNoPassword | null>(null)

  React.useEffect(() => {
    let isCurrent = true
    let username = usernameRef.current?.value
    let password = passwordRef.current?.value
    if (loading) {
      if (!username || !password) {
        setLoading(false)
        return
      }

      api.auth
        .login(username, password)
        .then((user) => {
          if (isCurrent) {
            setUser(user)
          }
        })
        .catch((error) => {
          if (isCurrent) {
            setError(error)
            setLoading(false)
          }
        })
    }
    return () => {
      isCurrent = false
    }
  }, [loading])

  React.useEffect(() => {
    if (user && onAuthenticated) {
      onAuthenticated(user)
    }
  }, [onAuthenticated, user])

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
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
            ref={usernameRef}
            aria-label="Username"
            disabled={loading}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="form-field">
          <input
            // You can pass the ref directly in like above with username,
            // or we can pass a function in and assign the current ourselves
            ref={(node) => (passwordRef.current = node)}
            aria-label="Password"
            disabled={loading}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button" disabled={loading}>
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
