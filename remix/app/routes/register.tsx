import { useState } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData, Form } from '@remix-run/react'
import type { LoaderArgs, ActionArgs } from '@remix-run/node'
import { createUserSession, login, registerUser } from '~/utils/auth.server'
import { usernameExists } from '~/utils/db.server'
import { FieldWrap } from '~/components/FormFields'
import { CenterContent } from '~/components/MainLayout'
import { Heading } from '~/components/Heading'

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const _action = formData.get('_action')
  const username = formData.get('username') as string | undefined
  const password = formData.get('password') as string | undefined

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

export default function () {
  const [type, setType] = useState<'login' | 'register'>('login')

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formValues = Object.fromEntries(new FormData(event.currentTarget))
  }

  return (
    <div className="ml-auto mr-auto max-w-[600px]">
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <Heading size={4}>Login</Heading>
        <Form onSubmit={onSubmit} method="post" className="space-y-3">
          <FieldWrap label="Username" required>
            <input className="form-field" type="text" name="username" />
          </FieldWrap>
          <FieldWrap label="password" required>
            <input className="form-field" type="password" name="password" />
          </FieldWrap>
          <footer className="flex justify-between items-center">
            <div>
              <button type="submit" className="button" name="_action" value={type}>
                Login
              </button>
            </div>
            <div>
              {type === 'login' ? (
                <button type="button" onClick={() => setType('register')}>
                  Need an account? Register
                </button>
              ) : (
                <button type="button" onClick={() => setType('login')}>
                  Have an account? Login
                </button>
              )}
            </div>
          </footer>
        </Form>
      </div>
    </div>
  )
}
