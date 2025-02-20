import { useState } from 'react'
import { useNavigate } from 'react-router'
import { LessonCard } from '~/Lesson'

export function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    setPending(true)
    setError('')

    login(username, password)
      .then((user) => {
        console.log(user)
        navigate('/account')
      })
      .catch((err) => {
        setError(err)
        setPending(false)
      })
  }

  return (
    <LessonCard>
      <form action={handleLogin} className="space-y-3 max-w-96">
        {error && <div className="text-red-800">{error}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-field"
            autoComplete="off"
            placeholder="username: user"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-field"
            placeholder="password: user"
            required
          />
        </div>
        <button type="submit" className="button" disabled={pending}>
          {!pending ? 'Login' : '...'}
        </button>
      </form>
    </LessonCard>
  )
}

// Fake login function (ignore this. don't change)
function login(username: string, password: string): Promise<{ userId: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'user') {
        resolve({ userId: 1 })
      } else {
        reject('Invalid Username or Password')
      }
    }, 800)
  })
}
