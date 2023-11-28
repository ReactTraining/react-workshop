import { useId } from 'react'
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type Fields = {
  age: number
  email: string
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()

  console.log(errors)

  const onSubmit: SubmitHandler<Fields> = (values) => {
    console.log('submit', values.age, typeof values.age)
  }

  // Talking Points
  // It can be quirky to get React Hook Form to conform input to your types
  // It's not easy to "register" fields with FieldInput abstraction
  // At best, we still have all our validation rules rolled up into this
  //   library in a way that we can't use elsewhere, like the server

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      {/* 
      React Hook Form's Built-in Validation */}
      <div>
        <label>Age</label>
        <input
          {...register('age', {
            required: true,
            min: 0,
            max: 120,
            // validate: (v) => {
            //   console.log('validate', typeof v) // depends on `valueAsNumber`
            //   // return true // if good
            //   return 'bad'
            // },
            // valueAsNumber: true,
          })}
          type="number"
          className="form-field"
          required
        />
      </div>

      {/*
      With Our FieldInput Abstraction */}
      <FieldInput label="Email" type="email" className="form-field" autoComplete="off" />

      {/*
      
      We don't want to write the register validation rules inside FieldInput because we wouldn't
      have flexibility. We also don't want to pass them in as props because the "types"
      for this object would be difficult to match what register wants
      <FieldInput label="Email" validate={{ ... }} />

      */}

      {/* <FieldWrap label="Email">
        {(field) => <input {...field} {...register('email', { required: true })} type="email" />}
      </FieldWrap> */}

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
