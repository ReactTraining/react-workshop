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
        <FieldEmail />
        <FieldPassword />
        {/* <FieldDatePicker /> */}
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

function FieldEmail() {
  const [field, meta] = useField('email')
  const id = 'email'
  return (
    <div className="space-y-1">
      <label htmlFor={id}>Email</label>
      <input {...field} id={id} type="email" autoComplete="off" className="form-field" />
      {meta.error && <p className="text-sm text-red-700">{meta.error}</p>}
    </div>
  )
}

function FieldPassword() {
  const [field, meta] = useField('password')
  const id = 'password'
  return (
    <div className="space-y-1">
      <label htmlFor={id}>Password</label>
      <input {...field} id={id} name="password" type="password" className="form-field" />
      {meta.error && <p className="text-sm text-red-700">{meta.error}</p>}
    </div>
  )
}

// function FieldDatePicker() {
//   const id = 'date-picker'
//   return (
//     <div className="space-y-1">
//       <label htmlFor={id}>Date Picker</label>
//       {/* This div is basically a custom input */}
//       <div className="form-field inline-flex items-center">
//         <input id={id} type="text" className="flex-1 border-none focus:outline-none" />
//         <Icon name="calendar" size={1} className="mb-1" />
//       </div>
//       {/* End Custom Input */}
//     </div>
//   )
// }
