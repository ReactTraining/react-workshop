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
      <FieldInput name="email" type="email" label="Email" autoComplete="off" />
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

function FieldWrap({ children, label }) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children(id)}
      <div>error</div>
    </div>
  )
}

function FieldInput({ name, type = 'text', label, ...props }) {
  return (
    <FieldWrap label={label}>
      {(id: string) => <input {...props} id={id} type={type} name={name} className="form-field" />}
    </FieldWrap>
  )
}
