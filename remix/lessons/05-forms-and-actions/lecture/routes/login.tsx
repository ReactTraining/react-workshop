import { useId } from 'react'
import bcrypt from 'bcryptjs'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { getUserPasswordHash } from '~/utils/db.server'
import type { ActionFunctionArgs } from '@remix-run/node'

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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  // Method Two
  const username = formData.get('username') as string | null
  const password = formData.get('password') as string | null

  if (!username || !password) return json({ error: 'Invalid Data' }, { status: 400 })

  return null
  // try {
  //   // const userId = await verifyUser(username, password)
  //   if (userId) {
  //     return redirect('/')
  //   } else {
  //     return json({ errors: 'Invalid username/pass' })
  //   }
  // } catch (err) {
  //   ///
  // }
}

export default function Login() {
  const usernameId = useId()
  const passwordId = useId()

  const { errors: serverErrors } = useActionData<typeof action>()

  // function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()

  //   const formData = new FormData(event.currentTarget)
  //   type FormValues = { username: string, password: string}
  //   const values = Object.fromEntries(formData) as FormValues

  //   login(values.)

  // }

  return (
    <div className="ml-auto mr-auto max-w-[600px]">
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <Heading size={4}>Login</Heading>
        <Form method="post" className="space-y-3" autoComplete="off">
          <div className="form-field-wrap space-y-1 required">
            <label htmlFor={usernameId} className="text-lg text-headingColor">
              Username
            </label>
            <div>
              <input id={usernameId} className="form-field" type="text" name="username" />
            </div>
          </div>

          <div className="form-field-wrap space-y-1 required">
            <label htmlFor={passwordId} className="text-lg text-headingColor">
              Password
            </label>
            <div>
              <input id={passwordId} className="form-field" type="password" name="password" />
            </div>
          </div>

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

// type FieldWrapProps = {
//   children: React.ReactNode
//   label: string
//   required?: boolean
// }

// export function FieldWrap({ children, label, required = false }: FieldWrapProps) {
//   const id = useId()
//   return (
//     <div className={classnames('form-field-wrap space-y-1', { required })}>
//       <label htmlFor={id} className="text-lg text-headingColor">
//         {label}
//       </label>
//       <div>{children}</div>
//     </div>
//   )
// }
