import { useState } from 'react'
import * as z from 'zod'
import { Form, data, type ActionFunctionArgs } from 'react-router'
import { FieldWrap } from '~/components/FormFields'
import { Heading } from '~/components/Heading'
import { createUserSession, registerUser } from '../utils/auth.server'
import { usernameExists } from '~/utils/db.server'
import type { Route } from './+types/register'

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
  const userExists = await usernameExists(username)
  if (userExists) return data({ error: 'Username already registered' }, { status: 400 })

  const userId = await registerUser(username, password)
  if (!userId) return data({ error: 'We were not able to register this user' }, { status: 400 })

  return createUserSession(userId, '/')
}

export default function Register({ actionData }: Route.ComponentProps) {
  const [formErrors, setFormErrors] = useState<FormErrorType>()
  const { error } = actionData || {}

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
        <Heading size={4}>Register</Heading>
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
              Register
            </button>
          </footer>
        </Form>
      </div>
    </div>
  )
}
