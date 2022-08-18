import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik onSubmit={(values) => {}} initialValues={{ email: '', password: '' }}>
      <Form className="spacing">
        <EmailField />
        <PasswordField></PasswordField>
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function EmailField() {
  const [field, meta] = useField('email')
  console.log(field)
  const emailId = useId()
  return (
    <div>
      <label htmlFor={emailId}>Email</label>
      <input {...field} type="email" className="form-field" autoComplete="off" />
      <p>errors</p>
    </div>
  )
}

function EmailField() {
  const [field, meta] = useField('email')
  console.log(field)
  const emailId = useId()
  return (
    <div>
      <label htmlFor={emailId}>Email</label>
      <input {...field} type="email" className="form-field" autoComplete="off" />
      <p>errors</p>
    </div>
  )
}
