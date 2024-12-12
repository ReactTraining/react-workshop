import { useId } from 'react'

export function LoginForm() {
  const passwordId = useId()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    console.log(values)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <FieldInput label="Email" name="email" type="email" />
      <FieldInput label="Password" name="password" type="password" />

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}

type FieldWrapProps = {
  children: React.ReactNode | ((stuff: { id: string }) => React.ReactNode)
  label: string
  type?: string
}

function FieldWrap({ children, label, type = 'text', ...props }: FieldWrapProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {typeof children === 'function' ? children({ id }) : children}
    </div>
  )
}

type FieldInputProps = {
  label: string
  name: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function FieldInput({ label, name, type = 'text', ...props }: FieldInputProps) {
  return (
    <FieldWrap label={label}>
      {(stuff) => {
        return <input {...stuff} {...props} type={type} name={name} className="form-field" />
      }}
    </FieldWrap>
  )
}
