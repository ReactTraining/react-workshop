import { useState, useId, useRef } from 'react'
import { Notice } from '~/Notice'
import type { User } from './index'

type Props = {
  onSubmit(user: User): void
}

export function LoginForm({ onSubmit }: Props) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const usernameId = useId()
  const passwordId = useId()

  const formRef = useRef<HTMLFormElement>(null!)
  const usernameRef = useRef<HTMLInputElement>(null!)
  const passwordRef = useRef<HTMLInputElement>(null!)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const username = usernameRef.current.value || ''
    const password = passwordRef.current.value || ''

    if (!username || !password) {
      setError('Username and Password are required')
      return
    }

    setLoading(true)
    login(username, password)
      .then((user) => {
        onSubmit(user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
        formRef.current.reset()
        usernameRef.current.focus()
      })
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <p>Default values are added to the form for quick testing</p>
      {error && <Notice type="error">{error}</Notice>}
      <div>
        <label htmlFor={usernameId}>Username</label>
        <input
          ref={usernameRef}
          id={usernameId}
          type="text"
          className="form-field"
          autoComplete="off"
          name="username"
          defaultValue="admin"
        />
      </div>
      <div>
        <label htmlFor={passwordId}>Password</label>
        <input
          ref={passwordRef}
          id={passwordId}
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
