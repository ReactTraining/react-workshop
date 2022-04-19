import { useId } from 'react'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, useField } from 'formik'

export function App() {
  function handleSubmit(values) {
    console.log(values)
  }

  function handleValidation(values) {
    // Not a very good way to verify emails
    return values.email.search('@') < 0 ? { email: 'Invalid Email' } : null
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', dob: '' }}
      onSubmit={handleSubmit}
      validate={handleValidation}
    >
      <Form className="spacing">
        <FieldEmail name="email" label="Email" autoComplete="off" />
        <FieldPassword name="password" label="Password" />
        <FieldDatePicker name="dob" label="Birthday" />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function FieldEmail({ name, label, ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return <input {...field} {...props} className="form-field" type="email" />
      }}
    </FieldWrap>
  )
}

function FieldPassword({ name, label, ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return <input {...field} {...props} className="form-field" type="password" />
      }}
    </FieldWrap>
  )
}

function FieldDatePicker({ name, label, ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return (
          <div className="form-field-icon">
            <div className="form-field-icon-input-wrap">
              <input {...field} {...props} type="text" />
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

function FieldWrap({ label, name, children }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className="field-wrap">
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, name, ...field })}</div>
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
