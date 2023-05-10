import { useId } from 'react'
import classnames from 'classnames'
import { json } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/node'
import { Heading } from '~/components/Heading'
import * as z from 'zod'

export default function Login() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Submit')
    // const formValues = Object.fromEntries(new FormData(event.currentTarget))
    // console.log(formValues)
  }

  const usernameId = useId()
  const passwordId = useId()

  return (
    <div className="ml-auto mr-auto max-w-[600px]">
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <Heading size={4}>Login</Heading>
        <form onSubmit={onSubmit} method="post" className="space-y-3">
          <div className="form-field-wrap space-y-1 required">
            <label htmlFor={usernameId} className="text-lg text-headingColor">
              Username
            </label>
            <div>
              <input id={usernameId} className="form-field" type="text" name="username" />
            </div>
            {/* <div className="text-red-500">Input Errors....</div> */}
          </div>

          <div className="form-field-wrap space-y-1 required">
            <label htmlFor={passwordId} className="text-lg text-headingColor">
              Password
            </label>
            <div>
              <input id={passwordId} className="form-field" type="password" name="password" />
            </div>
            {/* <div className="text-red-500">Input Errors....</div> */}
          </div>

          <footer className="flex justify-between items-center">
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
//   errors?: string[] | undefined
// }

// export function FieldWrap({ children, label, required = false, errors }: FieldWrapProps) {
//   const id = useId()
//   return (
//     <div className={classnames('form-field-wrap space-y-1', { required })}>
//       <label htmlFor={id} className="text-lg text-headingColor">
//         {label}
//       </label>
//       <div>{children}</div>
//       {errors && <div className="text-red-500">{errors.join(', ')}</div>}
//     </div>
//   )
// }
