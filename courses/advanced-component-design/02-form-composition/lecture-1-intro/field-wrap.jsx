import { useId } from 'react'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, Field, useField } from 'formik'

const initialValues = { email: '', password: '', dob: '' }

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
      <Form className="spacing">
        <FieldInput name="email" type="email" label="Email" autoComplete="off" />
        <FieldInput name="password" type="password" label="Password" />
        <FieldDatePicker name="dob" label="DOB" />
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

function FieldWrap({ children, name, label }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>{label}</label>
      {children(field, id)}
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

function FieldInput({ name, label, type = 'text', ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field, id) => {
        return <input {...props} {...field} id={id} type={type} className="form-field" />
      }}
    </FieldWrap>
  )
}

function FieldDatePicker({ name, label }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field, id) => {
        return (
          <div className="form-field-icon">
            <div className="form-field-icon-input-wrap">
              <input {...field} id={id} type="text" />
            </div>
            <div className="form-field-icon-wrap">
              <BsCalendar3 />
            </div>
          </div>
        )
      }}
    </FieldWrap>
  )
}
