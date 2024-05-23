import { useState } from 'react'

export function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    login(username, password)
      .then((user) => {
        console.log(user)
        setPending(false)
        setError('')
      })
      .catch((err) => {
        setError(err)
        setPending(false)
      })
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3 max-w-96">
      {error && <div className="text-red-800">{error}</div>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="form-field"
          autoComplete="off"
          placeholder="`admin` is username and password"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
          required
        />
      </div>
      <button type="submit" className="button" disabled={pending}>
        {!pending ? 'Login' : '...'}
      </button>
    </form>
  )
}

// Fake login function (ignore this. don't change)
function login(username: string, password: string): Promise<{ userId: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        resolve({ userId: 1 })
      } else {
        reject('Invalid Username or Password')
      }
    }, 800)
  })
}
