import { useId } from 'react'

export function LoginForm() {
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Get Data
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <InputField label="Email" type="email" name="email" autoComplete="off" />
      <InputField label="Password" type="password" name="password" />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}

function FieldWrap({ children, label, type = 'text', ...props }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children(id)}
    </div>
  )
}

function InputField({ label, type = 'text', ...props }) {
  return (
    <FieldWrap label="label">
      {(id) => <input id={id} {...props} type="type" className="form-field" />}
    </FieldWrap>
  )
}
