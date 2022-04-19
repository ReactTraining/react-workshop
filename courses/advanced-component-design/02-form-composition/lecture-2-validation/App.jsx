import { useId } from 'react'
import * as yup from 'yup'
import classnames from 'classnames'
import { BsCalendar3 } from 'react-icons/bs'
import { Formik, Form, useField } from 'formik'

/**
 * Validation Schema. You can use this code in Node and in the front-end
 */

const dateExp = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/

const formSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().required('Required').min(8, 'Must be at least 8 characters'),
  dob: yup.string().required('Required').matches(dateExp, 'Invalid Date: MM/DD/YYYY'),
})

// // Global (imported)
// const schemas = {
//   firstName: yup.string(),
//   lastName: yup.string(),
//   email: yup.string().email('Invalid Email'),
//   password: yup.string().min(8, 'Must be at least 8 characters'),
//   date: yup.string().matches(dateExp, 'Invalid Date: MM/DD/YYYY'),
// }

// // Pick the form-specific parts you want
// const formSchema = yup.object().shape({
//   email: schemas.email.required('Required'),
//   password: schemas.password.required('Required'),
//   dob: schemas.date.required('Required'),
// })

/**
 * Front End App
 */

export function App() {
  function handleSubmit(values) {
    console.log('submit', values)
  }

  function handleValidation(values) {
    formSchema.validate(values, { abortEarly: false }).catch((err) => {
      console.log('errors', err.errors)
    })
    return {}
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', dob: '' }}
      onSubmit={handleSubmit}
      validate={handleValidation}
      // validationSchema={formSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {/* noValidate in the form now because we don't want HTML5 validation too */}
      <Form className="spacing" noValidate>
        <FieldInput name="email" label="Email" type="Email" autoComplete="off" required />
        <FieldInput
          name="password"
          label="Password"
          type="password"
          required
          placeholder="At least 8 characters"
        />
        <FieldDatePicker name="dob" label="Birthday" placeholder="MM/DD/YYYY" />
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Formik>
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
