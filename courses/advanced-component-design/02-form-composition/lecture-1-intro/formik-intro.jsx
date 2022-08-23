import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <Formik
      onSubmit={(values) => {}}
      initialState={{ email: '', password: '' }}
      onValidate={(values) => {}}
    >
      <Form className="spacing">
        <EmailField></EmailField>

        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function EmailField() {
  const [field, meta] = useField('email') // useContext
  console.log(field)
  const id = useId()
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
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}
