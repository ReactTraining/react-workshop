import { useState } from 'react'
import { LessonCard } from '~/Lesson'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './AuthContext'
import { api } from '~/utils/api'

export function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuthContext()

  async function loginAction(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      // Login with server
      const user = await api.auth.login(username, password)

      // set state
      // Login with global state (context)
      login(user)
      navigate('/account')
    } catch (err) {
      if (typeof err === 'string') {
        setPending(false)
        setError(err)
      }
    }
  }

  return (
    <LessonCard>
      <form action={loginAction} className="space-y-3 max-w-96">
        {error && <div className="text-red-800">{error}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
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
            name="password"
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
