import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik onSubmit={(values) => {}} initialValues={{ email: '', password: '' }}>
      <Form className="spacing">
        <FieldEmail></FieldEmail>
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

function FieldEmail() {
  const [field, meta] = useField('email')
  const emailId = useId()

  return (
    <div>
      <label htmlFor={emailId}>Email</label>
      <input
        {...field}
        id={emailId}
        name="email"
        type="email"
        className="form-field"
        autoComplete="off"
      />
      <p>errors</p>
    </div>
  )
}
