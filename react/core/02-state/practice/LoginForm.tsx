import { useState } from 'react'

type Props = {
  onSubmit(user: { userId: number }): void
}

export function LoginForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false)

  // Task 1
  // Your main task is you make the username and password fields in this form
  // "controlled" with state. When the form submits, it already tries to take
  // the username and password and use them to authenticate. Then it sets
  // the "user" state in the parent (App) component

  // Remake these two variables with useState
  const username = ''
  const password = ''

  // You don't need to change anything in this function
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(username, password)

    setLoading(true)
    login(username, password).then((user) => {
      onSubmit(user)
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
          // value={}
          // onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-field"
          // value={}
          // onChange={}
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        Login
      </button>
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
