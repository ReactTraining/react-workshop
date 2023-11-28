import { useId, useState } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Must be at least 5 characters'),
})

type FormDataType = z.infer<typeof formSchema>
type FormErrorType = {
  [k in keyof FormDataType]?: string[] | undefined
}

export function LoginForm() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formValues = Object.fromEntries(new FormData(event.currentTarget))
    const results = formSchema.safeParse(formValues)

    if (!results.success) {
      console.error(results.error.flatten().fieldErrors)
    } else {
      console.log(formValues)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate={true}>
      <FieldInput
        label="Email"
        type="email"
        name="email"
        className="form-field"
        autoComplete="off"
        required
      />
      <FieldInput
        label="Password"
        type="password"
        name="password"
        className="form-field"
        required
      />
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
  error?: string[]
}

function FieldWrap({ children, label, error }: FieldWrapProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children({ id })}
      {/* <div className="text-sm text-red-800">Error</div> */}
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
