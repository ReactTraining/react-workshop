import { useState, useId, useRef } from 'react'
import { Notice } from '~/Notice'
import type { User } from './index'

type Props = {
  onSubmit(user: User): void
}

export function LoginForm({ onSubmit }: Props) {
  // Let's supply default values just so we don't have to type as much while testing
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    login(username, password)
      .then((user) => {
        onSubmit(user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      {error && <Notice type="error">{error}</Notice>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="form-field"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}

// Fake login function
function login(username: string, password: string): Promise<UserType> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username.toLowerCase() === 'admin') {
        resolve({ userId: 1 })
      } else {
        reject('Invalid username or password')
      }
    }, 800)
  })
}
