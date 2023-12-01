import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FieldDatePicker, FieldInput } from './FormFields.final'
import { SelectDateRange } from './SelectDateRange'

// Expects Format: YYYY-MM-DD  Example: 2023-01-30
const dateExpression = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

const formSchema = z.object({
  location: z.string().min(1, 'Required').max(100, 'Cannot exceed 100 characters'),
  startDate: z.string().regex(dateExpression, 'Invalid Date: YYYY-MM-DD'),
  endDate: z.string().regex(dateExpression, 'Invalid Date: YYYY-MM-DD'),
})

type FormDataType = z.infer<typeof formSchema>

export function App() {
  const methods = useForm<FormDataType>({ resolver: zodResolver(formSchema) })

  const onSubmit: SubmitHandler<FormDataType> = (values) => {
    console.log('submit', values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <FieldInput
          label="Location"
          name="location"
          type="text"
          className="form-field"
          autoComplete="off"
        />
        <FieldDatePicker startName="startDate" endName="endDate" label="Date Range" />

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
