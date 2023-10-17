import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { FieldInput, FieldDatePicker } from './FormFields.final'

// Expects Format: YYYY-MM-DD  Example: 2023-01-30
const dateExp = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

const formSchema = yup.object().shape({
  location: yup.string().required('Required'),
  startDate: yup.string().required('Required').matches(dateExp, 'Invalid Date: YYYY-MM-DD'),
  endDate: yup.string().required('Required').matches(dateExp, 'Invalid Date: YYYY-MM-DD'),
})

export function App() {
  function handleSubmit(values) {
    console.log('submit', values)
  }

  return (
    <Formik
      initialValues={{ location: '', startDate: '', endDate: '' }}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form className="space-y-3" noValidate>
        <FieldInput name="location" label="Vacation Location" autoComplete="off" required />
        <FieldDatePicker startName="startDate" endName="endDate" label="Date Range" />

        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}
