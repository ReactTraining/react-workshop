import { json } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/node'
import { createUserSession, login } from '~/utils/auth.server'
import { FieldWrap } from '~/components/FormFields'
import { Heading } from '~/components/Heading'

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const username = formData.get('username') as string | undefined
  const password = formData.get('password') as string | undefined

  if (!password || !username) return null

  const userId = await login(username, password)
  if (!userId) {
    return json('User not found', { status: 400 })
  }
  return createUserSession(userId, '/')
}

export default function () {
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
              <button type="submit" className="button">
                Login
              </button>
            </div>
            <div>
              <Link to="register" type="button">
                Need an account? Register
              </Link>
            </div>
          </footer>
        </Form>
      </div>
    </div>
  )
}
