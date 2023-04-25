import * as React from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik
      initialValues={{ email: '', password: 'pass' }}
      validate={(values) => {
        return { email: 'invalid' }
      }}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className="spacing">
        <EmailField />
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

function EmailField() {
  const id = React.useId()
  const [field, meta] = useField('email')

  return (
    <div>
      <label htmlFor={id}></label>
      <input id={id} {...field} type="email" className="form-field" autoComplete="off" />
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
