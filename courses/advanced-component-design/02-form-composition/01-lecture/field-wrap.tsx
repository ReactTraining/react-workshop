import React from 'react'
import { useId } from '@reach/auto-id'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  function handleSubmit(values) {
    console.log(values)
  }

  function handleValidation() {
    return { email: 'invalid' }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
      validate={handleValidation}
    >
      <Form className="spacing">
        <FieldEmail />
        <FieldPassword />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
  )
}

function FieldEmail() {
  const [_, meta] = useField('email')
  const id = 'email'
  return (
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>Email</label>
      <Field id={id} name="email" type="email" autoComplete="off" className="form-field" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

function FieldPassword() {
  const [_, meta] = useField('password')
  const id = 'password'
  return (
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>Password</label>
      <Field name="password" type="password" className="form-field" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

// function FieldDatePicker() {
//   return (
//     <div className="form-field-icon">
//       <div className="form-field-icon-input-wrap">
//         <input type="text" />
//       </div>
//       <div className="form-field-icon-wrap">
//         <BsCalendar3 />
//       </div>
//     </div>
//   )
// }
