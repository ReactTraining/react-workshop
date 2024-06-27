import { useId } from 'react'
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Must be at least 5 characters'),
})

type FormDataType = z.infer<typeof formSchema>

export function LoginForm() {
  const methods = useForm<FormDataType>({ resolver: zodResolver(formSchema) })

  const onSubmit: SubmitHandler<FormDataType> = (values) => {
    console.log('submit', values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <FieldInput
          label="Email"
          name="email"
          type="email"
          className="form-field"
          autoComplete="off"
        />
        <FieldInput label="Password" name="password" type="email" className="form-field" />

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </FormProvider>
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
  // const { formState } = useFormContext()
  // const error = formState.errors[name]?.message

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children({ id })}
      {/* <div className="text-sm text-red-800">Error<div> */}
    </div>
  )
}

type FieldInputProps = {
  label: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function FieldInput({ label, name, type = 'text', ...props }: FieldInputProps) {
  const { register } = useFormContext()

  return (
    <FieldWrap label={label}>
      {(field) => <input {...register(name)} {...field} {...props} type={type} />}
    </FieldWrap>
  )
}
