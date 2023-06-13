import * as React from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        return { email: 'invalid' }
      }}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className="spacing">
        <EmailField name="email" />
        <PasswordField name="password" />

        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function EmailField({ name }) {
  const id = React.useId()
  const [field, meta] = useField(name)

  return (
    <div>
      <label htmlFor={id}></label>
      <input {...field} type="text" name={name} />
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}

function PasswordField({ name }) {
  const id = React.useId()
  const [field, meta] = useField(name)

  return (
    <div>
      <label htmlFor={id}></label>
      <input {...field} type="text" name={name} />
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
