import { useState } from 'react'
import * as z from 'zod'
import { data } from '@remix-run/node'
import { Form, useActionData } from 'react-router'
import { FieldWrap } from '~/components/FormFields'
import { Heading } from '~/components/Heading'
import type { ActionFunctionArgs } from '@remix-run/node'
import { createUserSession, verifyUser } from '../utils/auth.server'

// Needed for when you make register.tsx
// import { usernameExists } from '~/utils/db.server'

const formSchema = z.object({
  username: z.string().min(5, 'Must be at least 5 characters'),
  password: z.string().min(5, 'Must be at least 5 characters'),
})

type FormDataType = z.infer<typeof formSchema>
type FormErrorType = {
  [k in keyof FormDataType]?: string[] | undefined
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const formValues = Object.fromEntries(formData)
  const results = formSchema.safeParse(formValues)
  if (!results.success) return data({ error: 'Invalid Data' }, { status: 400 })

  const { username, password } = results.data
  const userId = await verifyUser(username, password)
  if (!userId) return data({ error: 'User not found' }, { status: 400 })

  const redirectPath = '/'
  return createUserSession(userId, redirectPath)
}

export default function Login() {
  const [formErrors, setFormErrors] = useState<FormErrorType>()
  const { error } = useActionData<typeof action>() || {}

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formValues = Object.fromEntries(new FormData(event.currentTarget))
    const results = formSchema.safeParse(formValues)
    if (!results.success) {
      event.preventDefault()
      setFormErrors(results.error.flatten().fieldErrors)
    }
  }

  return (
    <div className="ml-auto mr-auto max-w-[600px]">
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <Heading size={4}>Login</Heading>
        {error && <div className="notice error">{error}</div>}
        <Form onSubmit={onSubmit} method="post" className="space-y-3" autoComplete="off">
          <FieldWrap label="Username" required errors={formErrors?.username}>
            {(field) => <input {...field} className="form-field" type="text" name="username" />}
          </FieldWrap>
          <FieldWrap label="Password" required errors={formErrors?.password}>
            {(field) => <input {...field} className="form-field" type="password" name="password" />}
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
