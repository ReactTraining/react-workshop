import { useId } from 'react'
import bcrypt from 'bcryptjs'
// import { data } from '@remix-run/node'
import { Form, data, redirect, type ActionFunctionArgs } from 'react-router'
import { Heading } from '~/components/Heading'
// import { getUserPasswordHash } from '~/utils/db.server'

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
 * Action and Component
 */

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  // Method One: It's difficult to get type-safety from Object.fromEntries
  const formValues = Object.fromEntries(formData)
  const { username, password } = formValues

  // Method Two
  // const username = formData.get('username') as string | null
  // const password = formData.get('password') as string | null

  if (!username || !password) return data({ error: 'Invalid Data' }, { status: 400 })

  // Login and redirect
  return redirect('/')
}

export default function Page() {
  const usernameId = useId()
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Three ways to collect form data
    // 1. Controlled with state
    // 2. Uncontrolled with Refs
    // 3. Uncontrolled with FormData
    // const formValues = Object.fromEntries(new FormData(event.currentTarget))
    // console.log(formValues)
  }

  return (
    <div className="ml-auto mr-auto max-w-[600px]">
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <Heading size={4}>Login</Heading>
        <form onSubmit={onSubmit} method="post" className="space-y-3" autoComplete="off">
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
        </form>
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
