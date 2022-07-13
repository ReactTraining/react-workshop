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
        <FieldInput name="email" label="Email" type="email" autoComplete="off" />
        <FieldInput name="password" label="Password" type="password" />

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

function FieldWrap({ name, label, children }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className="field-wrap spacing-small">
      <label htmlFor={id}>{label}</label>
      {children({ ...field, id })}
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

function FieldInput({ name, label, type = 'text', ...rest }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return <input {...field} {...rest} type={type} className="form-field" />
      }}
    </FieldWrap>
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
