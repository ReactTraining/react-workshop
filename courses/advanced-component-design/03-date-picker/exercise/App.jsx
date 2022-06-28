import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { FieldInput, FieldDateRangePicker } from './FormFields'
import { SelectDateRange } from './SelectDateRange'

// YYYY-MM-DD
const dateExp = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

const formSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().required('Required').min(8, 'Must be at least 8 characters'),
  startDate: yup.string().required('Required').matches(dateExp, 'Invalid Date: MM-DD-YYYY'),
  endDate: yup.string().required('Required').matches(dateExp, 'Invalid Date: MM-DD-YYYY'),
})

export function App({ onSubmit }) {
  return (
    <Formik
      initialValues={{ email: '', password: '', startDate: '', endDate: '' }}
      onSubmit={onSubmit}
      validationSchema={formSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form className="spacing" noValidate>
        <FieldInput name="email" label="Email" type="Email" autoComplete="off" required />
        <FieldInput
          name="password"
          label="Password"
          type="password"
          required
          placeholder="At least 8 characters"
        />
        <FieldDateRangePicker label="Date Range" />
        <SelectDateRange
          onSelect={(start, end) => {
            console.log(start, end)
          }}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}
