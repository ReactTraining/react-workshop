import { useState, useId, useRef } from 'react'
import { Notice } from '~/Notice'
import type { User } from './index'

type Props = {
  onSubmit(user: User): void
}

export function LoginForm({ onSubmit }: Props) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // These still need to be attached to JSX: <input ref={usernameRef} />
  const usernameRef = useRef<HTMLInputElement>(null!)
  const passwordRef = useRef<HTMLInputElement>(null!)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const username = ''
    const password = ''

    if (!username || !password) {
      setError('Username and Password are required')
      return
    }

    login(username, password)
      .then((user) => {
        onSubmit(user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        // Reset the form
        // Put focus back on the username
      })
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <p>Default values are added to the form for quick testing</p>
      {error && <Notice type="error">{error}</Notice>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="form-field"
          autoComplete="off"
          name="username"
          defaultValue="admin"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-field"
          name="password"
          defaultValue="admin"
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}

// Fake login function (ignore)
function login(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
        resolve({ userId: 1 })
      } else {
        reject('Invalid username or password')
      }
    }, 800)
  })
}
