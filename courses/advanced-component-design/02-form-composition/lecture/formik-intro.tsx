import React from 'react'
import { Formik, Form, Field, useField } from 'formik'

export function App() {
  return (
    <form>
      <div>
        <input type="email" />
      </div>
      <div>
        <input type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
