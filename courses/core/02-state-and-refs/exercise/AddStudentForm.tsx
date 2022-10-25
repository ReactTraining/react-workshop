import { useState, useRef } from 'react'
import { Heading } from 'course-platform/Heading'

export function AddStudentForm() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    username: '',
  })

  function setField(field, value) {
    setFormValues({ ...formValues, [field]: value })
  }

  const [autoUsername, setAutoUsername] = useState(true)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    console.log({
      fullName: formValues.fullName,
      username: formValues.username,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card spacing">
      <Heading>Add Student</Heading>
      <div className="field-wrap">
        <label htmlFor="full-name">Full Name</label>
        <input
          id="full-name"
          type="text"
          className="form-field"
          required
          autoComplete="off"
          value={formValues.fullName}
          onChange={(e) => {
            setField('fullName', e.target.value)
          }}
        />
      </div>

      <div className="field-wrap">
        <label htmlFor="username">Username</label>
        <input
          value={formValues.username}
          onChange={(e) => {
            setField('username', e.target.value)
          }}
          id="username"
          type="text"
          className="form-field"
          required
          autoComplete="off"
        />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input type="checkbox" />
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
