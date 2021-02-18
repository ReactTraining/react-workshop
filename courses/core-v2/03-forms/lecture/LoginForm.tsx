import React, { useState, useRef, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { User } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Notice } from 'ProjectPlanner/Notice'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated(user: User): void
}

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login('username', 'password') // 👈 👀 Get Real Values
      .then((user: User) => {
        onAuthenticated(user)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  function handleShowPassword(event: React.ChangeEvent) {
    // Explain generics for React.ChangeEvent or .checked wont work
    // console.log(event.target.checked)
    // Ultimately we don't need the event if we have "source of truth"
    // state for the checkbox.
  }

  return (
    <div>
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
          />
        </div>
        <div>
          <input
            required
            className="form-field"
            aria-label="Password"
            type="password"
            placeholder="Password"
          />
          <label>
            <input className="passwordCheckbox" type="checkbox" /> show password
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
    </div>
  )
}

export default LoginForm
