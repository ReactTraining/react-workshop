import { useState, useId, useRef } from 'react'
import { Notice } from '~/Notice'

type Props = {
  onSubmit(user: UserType): void
}

export function LoginForm({ onSubmit }: Props) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
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

type UserType = { userId: number; lat: number; lng: number }

// Fake login function
function login(username: string, password: string): Promise<UserType> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username.toLowerCase() === 'admin') {
        resolve({ userId: 1, lat: 40.712, lng: -74.006 })
      } else {
        reject('Invalid username or password')
      }
    }, 800)
  })
}
