import { useState, useTransition } from 'react'
import { LessonCard } from '~/Lesson'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(5, 'error'),
  password: z.string().min(5, 'error'),
})

type FormDataType = z.infer<typeof formSchema>

export function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const results = formSchema.safeParse(data)

    if (!results.error) {
      const formData = results.data
      setPending(true)
      setError('')

      login(formData.username, formData.password)
        .then((user) => {
          console.log(user)
          navigate('/account')
        })
        .catch((err) => {
          setError(err)
          setPending(false)
        })
    }
  }

  // // React 19 actions
  // // NOTE: We'll have to show useTransition for pending state
  // // This setPending(true) will NOT work without it
  // async function loginAction(formData: FormData) {
  //   const username = formData.get('username') as string
  //   const password = formData.get('password') as string

  //   setPending(true)
  //   setError('')

  //   try {
  //     const user = await login(username, password)
  //     console.log(user)
  //     navigate('/account')
  //   } catch (err) {
  //     if (typeof err === 'string') {
  //       setPending(false)
  //       setError(err)
  //     }
  //   }
  // }

  return (
    <LessonCard>
      <form onSubmit={handleLogin} className="space-y-3 max-w-96">
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
