import classnames from 'classnames'
import { useId } from 'react'
import bcrypt from 'bcryptjs'
import { json, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { getUserPasswordHash } from '~/utils/db.server'
import type { ActionArgs } from '@remix-run/node'

/**
 * Verify User
 */

// async function verifyUser(username: string, password: string) {
//   const user = await getUserPasswordHash(username)
//   if (!user) return null

//   const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
//   if (!isCorrectPassword) return null

//   return user.id
// }

/**
 * Remix Action and Component
 */

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const username = formData.get('username') as string | null
  const password = formData.get('password') as string | null

  if (!username || !password) return json({ error: 'Invalid Data' }, { status: 400 })

  // Login and redirect
  return redirect('/')
}

export default function Login() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // event.preventDefault()
  }

  return (
    <div className="ml-auto mr-auto max-w-[600px]">
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <Heading size={4}>Login</Heading>
        <Form onSubmit={onSubmit} method="post" className="space-y-3" autoComplete="off">
          <FieldWrap label="Username" required>
            {(id) => {
              return <input id={id} className="form-field" type="text" name="username" />
            }}
          </FieldWrap>

          <FieldWrap label="Password" required>
            {(id) => {
              return <input id={id} className="form-field" type="password" name="password" />
            }}
          </FieldWrap>

          <footer>
            <button type="submit" className="button">
              Login
            </button>
          </footer>
        </Form>
      </div>
    </div>
  )
}

type FieldWrapProps = {
  children: (id: string) => React.ReactNode
  label: string
  required?: boolean
}

export function FieldWrap({ children, label, required = false }: FieldWrapProps) {
  const id = useId()
  return (
    <div className={classnames('form-field-wrap space-y-1', { required })}>
      <label htmlFor={id} className="text-lg text-headingColor">
        {label}
      </label>
      <div>{children(id)}</div>
    </div>
  )
}
