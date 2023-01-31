import { useState, useRef, useId } from 'react'
import { Heading } from 'course-platform/Heading'
import { Notice } from 'course-platform/Notice'
import { login } from './utils'

type Props = {
  onSuccess: (user: { userId: number; name: string }) => void
}

export function LoginForm({ onSuccess }: Props) {
  const [formValues, setFormValues] = useState({
    username: 'admin',
    password: 'admin',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null!)
  const usernameId = useId()
  const passwordId = useId()

  // This is an optional nice "utility function" to handle
  // events below and to have one place that calls setFormValues
  // instead of many
  function setField(field: string, value: string) {
    setFormValues({ ...formValues, [field]: value })
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    login(formValues.username, formValues.password)
      .then((user) => {
        onSuccess(user)

        // Reset form and set focus
        setFormValues({
          username: '',
          password: '',
        })
        usernameRef.current.focus()
      })
      .catch(() => {
        setError(true)
      })
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
          value={formValues.username}
          onChange={(e) => {
            setField('username', e.target.value)
          }}
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
        <input
          value={formValues.password}
          onChange={(e) => setField('password', e.target.value)}
          id={passwordId}
          type={showPassword ? 'text' : 'password'}
          className="form-field"
          autoComplete="off"
          required
        />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
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
