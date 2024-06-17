import { login } from '@/utils/login'
import { SubmitButton } from './SubmitButton'

// This is all server code. So we don't have a "pending"
// status. But we can use useFormStatus in a 'use client'
// file. See <SubmitButton>

export function LoginForm() {
  console.log('Where does this run?') // server only

  async function loginAction(formData: FormData) {
    'use server'
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const user = await login(username, password)
      console.log('Server', user)
    } catch (err) {
      console.log('ERR', err)
    }
  }

  return (
    <form action={loginAction} className="space-y-3 max-w-96">
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

      <SubmitButton>Login</SubmitButton>
    </form>
  )
}
