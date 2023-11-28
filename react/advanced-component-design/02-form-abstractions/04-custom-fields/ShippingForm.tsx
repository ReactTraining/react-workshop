import { useId } from 'react'
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  street: z.string().min(1, 'Required').max(100, 'Cannot exceed 100 characters'),
  city: z.string().max(100, 'Cannot exceed 100 characters'),
  state: z.string().regex(/^[a-zA-Z]{2}$/, 'Invalid State Code (two characters only)'),
  zip: z.string().regex(/^\d{5}$/, 'Invalid Zip'),
})

type FormDataType = z.infer<typeof formSchema>

export function ShippingForm() {
  const methods = useForm<FormDataType>({ resolver: zodResolver(formSchema) })

  const onSubmit: SubmitHandler<FormDataType> = (values) => {
    console.log('submit', values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <FieldInput
          label="Street"
          hideLabel
          name="street"
          type="text"
          className="form-field"
          autoComplete="off"
          placeholder="Street"
        />
        <FieldCityStateZip />

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
  children(obj: { id: string; 'aria-label'?: string }): React.ReactNode
  label: string
  hideLabel?: boolean
  name: string
}

function FieldWrap({ children, name, label, hideLabel = false }: FieldWrapProps) {
  const id = useId()
  const { formState } = useFormContext()
  const error = formState.errors[name]?.message

  return (
    <div>
      {!hideLabel && <label htmlFor={id}>{label}</label>}
      {children({ id, 'aria-label': hideLabel ? label : undefined })}
      {typeof error === 'string' && <div className="text-sm text-red-800">{error}</div>}
    </div>
  )
}

type FieldInputProps = {
  label: string
  hideLabel?: boolean
  name: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function FieldInput({ label, hideLabel = false, name, type = 'text', ...props }: FieldInputProps) {
  const { register } = useFormContext()

  return (
    <FieldWrap label={label} hideLabel={hideLabel} name={name}>
      {(field) => <input {...field} {...props} {...register(name)} type={type} />}
    </FieldWrap>
  )
}

function FieldCityStateZip() {
  const { register, formState } = useFormContext()
  const cityError = formState.errors.city?.message
  const stateError = formState.errors.state?.message
  const zipError = formState.errors.zip?.message

  return (
    <div className="space-y-1">
      <div className="form-field flex gap-3">
        <input
          {...register('city')}
          aria-label="City"
          type="text"
          placeholder="City"
          className="flex-1 w-32 focus:outline-none"
          autoComplete="off"
        />
        <input
          {...register('state')}
          aria-label="State"
          type="text"
          placeholder="State"
          className="flex-1 w-0 focus:outline-none"
          autoComplete="off"
        />
        <input
          {...register('zip')}
          aria-label="Zip"
          type="number"
          placeholder="Zip"
          className="flex-1 w-0 focus:outline-none"
          autoComplete="off"
          maxLength={5}
        />
      </div>
      {typeof cityError === 'string' && <div className="text-sm text-red-800">{cityError}</div>}
      {typeof stateError === 'string' && <div className="text-sm text-red-800">{stateError}</div>}
      {typeof zipError === 'string' && <div className="text-sm text-red-800">{zipError}</div>}
    </div>
  )
}
