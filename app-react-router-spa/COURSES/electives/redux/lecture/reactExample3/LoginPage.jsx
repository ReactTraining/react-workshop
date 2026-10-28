import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Heading } from '~/Heading'
import { Icon } from '~/Icon'
import { Notice } from '~/Notice'
import { useAuth } from './AuthContext'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Loading and error state for the login request is local to this page
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleLogin(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = (data.get('username') || '').toString()
    const password = (data.get('password') || '').toString()

    setLoading(true)
    setError('')
    login(username, password)
      .then(() => navigate(location.state?.from || '/'))
      .catch((error) => {
        setError(String(error))
        setLoading(false)
      })
  }

  return (
    <div className="max-w-[500px] mx-auto space-y-6">
      <Heading size={2}>Login</Heading>
      <form onSubmit={handleLogin} className="space-y-3">
        <Notice>
          Login with username <b>user</b> and password <b>user</b>
        </Notice>
        {error && (
          <Notice type="error">
            <Icon name="warning" />
            <span className="align-middle ml-2">{error}</span>
          </Notice>
        )}
        <input
          name="username"
          aria-label="Username"
          type="text"
          placeholder="Username"
          className="form-field"
          autoComplete="off"
          required
        />
        <input
          name="password"
          aria-label="Password"
          type="password"
          placeholder="Password"
          className="form-field"
          required
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <Icon name="signIn" />
              <span>Login</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
