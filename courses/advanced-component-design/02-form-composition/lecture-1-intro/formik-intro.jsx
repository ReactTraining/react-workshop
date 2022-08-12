import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  const emailId = useId() // :r2:

  return (
    <Formik onSubmit={(values) => {}} initialValues={{ email: '', password: '' }}>
      <Form className="spacing">
        <FormFieldEmail></FormFieldEmail>
        <div>
          <Field name="password" type="password" className="form-field" />
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function FormFieldEmail() {
  return (
    <div>
      <label htmlFor={emailId}>Email</label>
      <Field id={emailId} name="email" type="email" className="form-field" autoComplete="off" />
    </div>
  )
}
