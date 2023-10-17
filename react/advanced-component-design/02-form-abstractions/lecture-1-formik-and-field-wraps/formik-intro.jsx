import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  function handleSubmit(values) {
    console.log(values)
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      validate={(values) => {
        if (values.email !== 'a@b.com') {
          return { email: 'invalid email' }
        }
        return {}
      }}
      initialValues={{ email: '', password: '' }}
    >
      <Form className="space-y-3">
        <FieldEmail />
        <FieldPassword />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function FieldEmail({ label = 'Email' }) {
  const [field, meta] = useField('email')
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...field} id={id} name="email" type="email" className="form-field" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

function FieldPassword({ label = 'Email' }) {
  const [field, meta] = useField('email')
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...field} id={id} name="email" type="email" className="form-field" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}
