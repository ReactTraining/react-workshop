import { useState, useRef } from 'react'
import { Heading } from 'course-platform/Heading'

const initialFormValues = {
  fullName: '',
  username: '',
}

export function AddStudentForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [autoUsername, setAutoUsername] = useState(true)

  console.log('rerender', formValues)

  function setField(field: string, value: string) {
    setFormValues({ ...formValues, [field]: value })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // console.log(formValues)

    console.log({
      ...formValues,
      username: autoUsername
        ? formValues.fullName.toLowerCase().replaceAll(/\s/g, '')
        : formValues.username,
    })

    setFormValues(initialFormValues)
  }

  return (
    <form onSubmit={handleSubmit} className="card spacing">
      <Heading>Add Student</Heading>
      <div className="field-wrap">
        <label htmlFor="full-name">Full Name</label>
        <input
          value={formValues.fullName}
          onChange={(e) => {
            setField('fullName', e.target.value)
          }}
          id="full-name"
          type="text"
          className="form-field"
          required
          autoComplete="off"
        />
      </div>

      <div className="field-wrap">
        <label htmlFor="username">Username</label>
        <input
          value={
            autoUsername
              ? formValues.fullName.toLowerCase().replaceAll(/\s/g, '')
              : formValues.username
          }
          onChange={(e) => setField('username', e.target.value)}
          id="username"
          type="text"
          className="form-field"
          required
          autoComplete="off"
        />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input
            checked={autoUsername}
            onChange={(e) => setAutoUsername(!autoUsername)}
            type="checkbox"
          />
          <span>Auto Username</span>
        </label>
      </div>

      <hr />
      <button type="submit" className="button">
        Add Student
      </button>
    </form>
  )
}
