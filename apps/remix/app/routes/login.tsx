import { useState } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData, Form } from '@remix-run/react'
import type { LoaderArgs, ActionArgs } from '@remix-run/node'
import { createUserSession, login, registerUser } from '~/utils/auth.server'
import { usernameExists } from '~/utils/db.server'

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const _action = formData.get('_action')
  const password = formData.get('password') as string | null
  const username = formData.get('username') as string | null

  if (!password || !username) return null

  switch (_action) {
    case 'login': {
      const userId = await login(username, password)
      if (!userId) {
        return json('User not found', { status: 400 })
      }
      return createUserSession(userId, '/')
    }
    case 'register': {
      const userExists = await usernameExists(username)
      if (userExists) {
        return json('Username already registered', { status: 400 })
      }
      const userId = await registerUser(username, password)
      if (!userId) {
        return json('User registration error', { status: 400 })
      }
      return createUserSession(userId, '/')
    }
  }
}

export default function Page() {
  const [type, setType] = useState<'login' | 'register'>('login')

  return (
    <div>
      <button onClick={() => setType('register')} className="button">
        Register
      </button>
      <button onClick={() => setType('login')} className="button">
        Login
      </button>
      <Form method="post">
        <div>
          <input type="text" name="username" />
        </div>
        <br />
        <div>
          <input type="text" name="password" />
        </div>
        <div>
          <button type="submit" className="button" name="_action" value={type}>
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}
