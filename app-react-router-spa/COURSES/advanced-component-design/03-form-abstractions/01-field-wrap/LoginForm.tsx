import { useId } from 'react'

export function LoginForm() {
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Get Data
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <FieldWrap label="Email">
        {({ id }) => (
          <input id={id} type="email" name="email" className="form-field" autoComplete="off" />
        )}
      </FieldWrap>
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

function FieldWrap({ label, children }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children({ id })}
    </div>
  )
}
