import { useState } from 'react'
import type { User } from './App'

// This type says that we want an `onSubmit` prop that is
// a function that when called will be passed one argument
// which is a User. When you call this fn, it won't return
// anything (void). User Props like this:
// function LoginForm({ onSubmit }: Props) {

// type Props = {
//   onSubmit(user: User): void
// }

export function LoginForm() {
  // The logged user
  const [user, setUser] = useState<User | null>(null)

  // Whether we pending the form submission
  const [pending, setPending] = useState(false)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    setPending(true)
    login(username, password).then((user) => {
      setPending(false)
      setUser(user)
    })
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="form-field"
          autoComplete="off"
          placeholder="Enter any value"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" className="form-field" />
      </div>
      <button type="submit" className="button" disabled={pending}>
        {!pending ? 'Login' : '...'}
      </button>
      {user && <div>User ID: {user.userId}</div>}
    </form>
  )
}

// Fake login function (ignore this. don't change)
function login(username: string, password: string): Promise<{ userId: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ userId: 1 })
    }, 800)
  })
}
