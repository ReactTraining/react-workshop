import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '~/utils/api'
import { useAuthContext } from '~/AuthContext'
import { Card } from '~/Card'
import { Heading } from '~/Heading'
import { CenterContent } from '~/CenterContent'
import { Icon } from '~/Icon'
import { Notice } from '~/Notice'
import type { User } from '~/utils/types'

export function LoginPage() {
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const data = new FormData(event.currentTarget)
    const username = (data.get('username') || '').toString()
    const password = (data.get('password') || '').toString()

    if (!username || !password) {
      setError('Username and Password are required')
      return
    }

    api.auth
      .login(username, password)
      .then((user: User) => {
        login(user)
        navigate('/account')
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <CenterContent maxWidth={700}>
      <Card className="mt-6 space-y-6">
        <Heading>Login</Heading>
        <form onSubmit={handleLogin} className="space-y-3">
          {error && (
            <Notice type="error">
              <Icon name="warning" />
              <span className="align-middle ml-2">{error}</span>
            </Notice>
          )}

          <div>
            <input
              name="username"
              defaultValue="user"
              aria-label="Username"
              type="text"
              placeholder="Username"
              className="form-field"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <input
              name="password"
              defaultValue="user"
              aria-label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="form-field"
              required
            />
          </div>
          <div>
            <label className="space-x-1">
              <input
                onChange={handleShowPassword}
                defaultChecked={showPassword}
                type="checkbox"
                className="align-middle"
              />
              <span className="text-sm align-middle">Show Password</span>
            </label>
          </div>

          <footer>
            <button type="submit" className="button">
              {!loading ? (
                <>
                  <Icon name="signIn" />
                  <span>Login</span>
                </>
              ) : (
                <span>Loading...</span>
              )}
            </button>
          </footer>
        </form>
      </Card>
    </CenterContent>
  )
}
