import React from 'react'
import { useId } from '@reach/auto-id'
import classnames from 'classnames'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, useField } from 'formik'

export function App() {
  function handleSubmit(values) {
    console.log(values)
  }

  function handleValidation(values) {
    // A terrible regular expression for emails, but the point is we can do
    // validation and we'll do a better job later
    return /^\S+@\S+$/.test(values.email) ? {} : { email: 'Invalid Email' }
  }

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', dob: '' }}
      onSubmit={handleSubmit}
      validate={handleValidation}
    >
      <Form className="spacing">
        <FieldInput name="firstName" label="First Name" autoComplete="off" required />
        <FieldInput name="lastName" label="Last Name" autoComplete="off" required />
        <FieldInput name="email" label="Email" type="Email" autoComplete="off" required />
        <FieldInput name="password" label="Password" type="password" required />
        <FieldDatePicker name="dob" label="Birthday" />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
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

function FieldInput({ name, label, required = false, type = 'text', className, ...props }) {
  return (
    <FieldWrap name={name} label={label} required={required}>
      {(field) => {
        return (
          <input
            {...props}
            {...field}
            className={classnames('form-field', className)}
            type={type}
            required={required}
          />
        )
      }}
    </FieldWrap>
  )
}

function FieldWrap({ label, name, required = false, children }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className={classnames('field-wrap', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, name, ...field })}</div>
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
