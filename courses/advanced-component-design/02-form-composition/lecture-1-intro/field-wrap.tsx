import { useId } from 'react'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, Field, useField } from 'formik'

const initialValues = { email: '', password: '' }

export function App() {
  function handleSubmit(values: typeof initialValues) {
    console.log(values)
  }

  function handleValidation(values: any): any {
    // Not a very good way to verify emails
    return values.email.search('@') < 0 ? { email: 'Invalid Email' } : null
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={handleValidation}>
      <Form className="spacing">
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
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>Email</label>
      <input {...field} id={id} type="email" autoComplete="off" className="form-field" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

function FieldPassword() {
  const [field, meta] = useField('password')
  const id = 'password'
  return (
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>Password</label>
      <input {...field} name="password" type="password" className="form-field" />
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
