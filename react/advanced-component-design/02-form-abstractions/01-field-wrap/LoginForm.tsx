import { useId } from 'react'

export function LoginForm() {
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Get Data
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <FieldInput label="Email" name="email" type="email" autoComplete="off" />
      <FieldInput label="Password" name="password" type="password" autoComplete="off" />

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}

function FieldWrap({ label, children, ...props }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {id}
    </div>
  )
}

function FieldInput({ label, name, type = 'text', ...props }) {
  return (
    <FieldWrap label={label}>
      {(id) => {
        return <input {...props} id={id} type={type} name={name} className="form-field" />
      }}
    </FieldWrap>
  )
}
