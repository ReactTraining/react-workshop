import { useId } from 'react'

export function LoginForm() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData)
    console.log(values)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <FieldInput label="Email" type="email" className="form-field" autoComplete="off" />
      <FieldInput label="Password" type="password" className="form-field" />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}

/****************************************
  Field Abstractions
*****************************************/

type FieldWrapProps = {
  children(obj: { id: string }): React.ReactNode
  label: string
}

function FieldWrap({ children, label }: FieldWrapProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children({ id })}
      <div className="text-sm text-red-800">Error</div>
    </div>
  )
}

type FieldInputProps = {
  label: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function FieldInput({ label, type = 'text', ...props }: FieldInputProps) {
  return (
    <FieldWrap label={label}>{(field) => <input {...field} {...props} type={type} />}</FieldWrap>
  )
}
