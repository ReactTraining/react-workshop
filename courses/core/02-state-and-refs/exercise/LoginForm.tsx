import { useState, useRef, useId } from 'react'
import { Heading } from 'course-platform/Heading'
import { Notice } from 'course-platform/Notice'

type Props = {
  onSuccess: (user: { userId: number; name: string }) => void
}

export function LoginForm({ onSuccess }: Props) {
  // Task 1: Make state for username and password here. See more in the Guide.md

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null!)
  const usernameId = useId()
  const passwordId = useId()

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    // Task 2: Change to check the values of the username and password. If they are not "admin",
    // then set the error as shown
    // if (/* your logic */) {
    //   setError(true)
    //   return
    // }

    // Let's pretend the network requests to verify login credentials was
    // successful and now we have this user data. Don't change this:
    const user = {
      userId: 1,
      name: 'Admin',
    }

    onSuccess(user)
  }

  return (
    <form onSubmit={handleLogin} className="card spacing">
      <Heading>Login</Heading>
      {!error ? (
        <Notice>
          Use <b>admin</b> for both the username and password:
        </Notice>
      ) : (
        <Notice type="error">Login Failed</Notice>
      )}
      <hr />
      <div className="field-wrap">
        <label htmlFor={usernameId}>Username</label>
        <input
          // value={}
          // onChange={(e) => {
          //   //e.target.value
          // }}
          id={usernameId}
          type="username"
          className="form-field"
          required
          autoComplete="off"
          ref={usernameRef}
        />
      </div>

      <div className="field-wrap">
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" className="form-field" autoComplete="off" required />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input
            type="checkbox"
            checked={false}
            // onChange={}
          />
          <span>Show Password</span>
        </label>
      </div>

      <hr />
      <button type="submit" className="button">
        Login
      </button>
    </form>
  )
}
