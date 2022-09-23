import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik
      onSubmit={(values) => {}}
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        return { email: 'invalid ' }
      }}
    >
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
  const id = useId()

  return (
    <div>
      <label htmlFor={id}></label>
      <input {...field} id={id} type="email" className="form-field" autoComplete="off" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}
