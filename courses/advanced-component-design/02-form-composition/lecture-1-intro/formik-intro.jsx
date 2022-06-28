import * as React from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik onSubmit={(values) => {}} initialValues={{ email: '', password: '' }}>
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
  const [field, meta, helpers] = useField('email')
  console.log(field)

  const id = React.useId()
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input
        {...field}
        id={id}
        name="email"
        type="email"
        className="form-field"
        autoComplete="off"
      />
      <div>error...</div>
    </div>
  )
}
