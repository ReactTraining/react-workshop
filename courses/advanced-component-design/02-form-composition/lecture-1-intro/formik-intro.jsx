import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values)
      }}
      validate={(values) => {
        return { email: 'invalid' }
      }}
    >
      <Form className="spacing">
        <EmailField></EmailField>
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
  const id = useId()
  const [field, meta] = useField('email')

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input
        {...field} // onChange -> state -> context
        id={id}
        name="email"
        type="email"
        className="form-field"
        autoComplete="off"
      />
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
