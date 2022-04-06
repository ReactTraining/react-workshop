import { useState, useRef } from 'react'
import { Heading } from 'course-platform/Heading'

const initialFormValues = {
  fullName: '',
  username: '',
}

export function AddStudentForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [autoUsername, setAutoUsername] = useState(true)

  const fullNameRef = useRef<HTMLInputElement>(null!)

  function setField(field: string, value: string) {
    setFormValues({ ...formValues, [field]: value })
  }

  function getUsername() {
    return autoUsername
      ? formValues.fullName.toLowerCase().replaceAll(/\s/g, '')
      : formValues.username
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    // Get the form values
    console.log({ ...formValues, username: getUsername() })

    // Reset form, set focus
    setFormValues(initialFormValues)
    fullNameRef.current.focus()
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
          ref={fullNameRef}
        />
      </div>

      <div className="field-wrap">
        <label htmlFor="username">Username</label>
        <input
          value={getUsername()}
          disabled={autoUsername}
          onChange={(e) => setField('username', e.target.value)}
          id="username"
          type="text"
          className="form-field"
          autoComplete="off"
          required
        />
      </div>

      <div>
        <label className="vertical-middle horizontal-spacing">
          <input
            type="checkbox"
            checked={autoUsername}
            onChange={(e) => setAutoUsername(!autoUsername)}
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
