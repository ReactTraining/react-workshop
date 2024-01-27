import { useId } from 'react'

export function LoginForm() {
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formValues = Object.fromEntries(new FormData(event.currentTarget))
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <FieldWrap label="Email" name="email" autoComplete="off" type="email"></FieldWrap>

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

function FieldWrap({ label, name, type = 'text', ...props }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...props} type={type} id={id} name={name} className="form-field" />
    </div>
  )
}
