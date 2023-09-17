import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <form className="spacing">
      <div>
        <input type="email" className="form-field" autoComplete="off" />
      </div>
      <div>
        <input type="password" className="form-field" />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
