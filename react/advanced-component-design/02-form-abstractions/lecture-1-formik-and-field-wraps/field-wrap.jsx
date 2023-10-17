import { useId } from 'react'
import { Formik, Form, Field, useField } from 'formik'
import { Icon } from '~/Icon'

const initialValues = { email: '', password: '' }

export function App() {
  function handleSubmit(values) {
    console.log(values)
  }

  function handleValidation(values) {
    // Not a very good way to verify emails
    return values.email.search('@') < 0 ? { email: 'Invalid Email' } : null
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={handleValidation}>
      <Form className="space-y-3">
        <FieldInput name="email" label="Email" autoComplete="off" className="form-field" />
        <FieldInput name="password" label="Password" className="form-field" />
        <FieldDatePicker />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

/**
 * Fields
 */

function FieldWrap({ children, label, name }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className="space-y-1">
      <label htmlFor={id}>{label}</label>
      {children(field, id)}
      {meta.error && <p className="text-sm text-red-700">{meta.error}</p>}
    </div>
  )
}

function FieldInput({ name, label, type = 'text', ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field, id) => <input {...field} {...props} id={id} type={type} />}
    </FieldWrap>
  )
}

function FieldDatePicker() {
  const id = useId()
  return (
    <FieldWrap name="dob" label="DOB">
      {(field, id) => {
        return (
          <div className="form-field inline-flex items-center">
            <input
              {...field}
              id={id}
              type="text"
              className="flex-1 border-none focus:outline-none"
            />
            <Icon name="calendar" size={1} className="mb-1" />
          </div>
        )
      }}
    </FieldWrap>
  )
}
