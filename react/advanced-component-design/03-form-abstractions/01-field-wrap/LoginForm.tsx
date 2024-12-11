import { useId } from 'react'

export function LoginForm() {
  const emailId = useId()
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Get Data
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} type="email" name="email" className="form-field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" name="password" className="form-field" />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
