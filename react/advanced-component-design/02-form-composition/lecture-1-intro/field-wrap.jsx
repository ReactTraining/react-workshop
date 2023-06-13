import { useId } from 'react'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, Field, useField } from 'formik'

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
      <Form className="spacing">
        <FieldInput name="email" label="Email" />
        <FieldInput name="password" label="Password" />
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
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>{label}</label>
      {children({ id, ...field })}
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

function FieldInput({ name, label }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return <input {...field} name="password" type="password" className="form-field" />
      }}
    </FieldWrap>
  )
}

function FieldDatePicker() {
  return (
    <FieldWrap name="datepicker" label="Date Picker">
      {(field) => {
        return (
          <div className="form-field-icon">
            <div className="form-field-icon-input-wrap">
              <input {...field} type="text" />
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
