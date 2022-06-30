import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik
      onSubmit={(values) => {}}
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        return { email: 'invalid' }
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
  const [field, meta] = useField('email')
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input
        id={id}
        {...field}
        name="email"
        type="email"
        className="form-field"
        autoComplete="off"
      />
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
