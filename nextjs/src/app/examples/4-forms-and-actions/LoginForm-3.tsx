'use client'

// import { useState } from 'react'
import { login } from '@/utils/login'
import { type ActionState, loginAction as serverLoginAction } from './loginAction'
import { SubmitButton } from './SubmitButton'

// Temp fix for Next
import { useFormState as useActionState } from 'react-dom'

// 1. Change to `use client`. The 'use server' action won't work
// 2. Refactor to import action from `loginAction.tsx`
// 3. Now it works but we don't have state. We could get pending
//    state from useFormStatus but how do we communicate the action's
//    data back to the client? like responses
// 4. Refactor to useActionState(). The latest version of next will
//    require us to import the older useFormState and alias it.
// 5. Show how we can still do client-side validation with onSubmit
//    which if we don't preventDefault will then call the action

// Note: There seems to be a discrepancy about whether useActionState
// will return `pending`. In the docs it says it wont. In the later
// released '19 release notes' it says it will:
// https://react.dev/blog/2024/04/25/react-19
// https://react.dev/reference/react/useActionState

export function LoginForm() {
  const [state, action] = useActionState(serverLoginAction, { user: null, error: '' })
  const { error, user } = state

  console.log(user)

  return (
    <form action={action} className="space-y-3 max-w-96">
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
      <SubmitButton>Login</SubmitButton>
      {/* <button type="submit" className="button" disabled={pending}>
        {!pending ? 'Login' : '...'}
      </button> */}
    </form>
  )
}

/**
 * End Goal:
 */

// export function LoginForm() {
//   const [state, loginAction] = useActionState<ActionState>(serverLoginAction, {
//     user: null,
//     error: '',
//   })

//   console.log('client', state.user)

//   return (
//     <form action={loginAction} className="space-y-3 max-w-96">
//       {state.error && <div className="text-red-800">{state.error}</div>}
//       <div>
//         <label htmlFor="username">Username</label>
//         <input
//           name="username"
//           id="username"
//           type="text"
//           className="form-field"
//           autoComplete="off"
//           placeholder="username: user"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           id="password"
//           type="password"
//           className="form-field"
//           placeholder="password: user"
//           required
//         />
//       </div>
//       <SubmitButton>Login</SubmitButton>
//     </form>
//   )
// }
