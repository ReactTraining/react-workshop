import { useState, useRef } from 'react'
import { Heading } from 'course-platform/Heading'

export function AddStudentForm() {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')

  const [autoUsername, setAutoUsername] = useState(true)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    console.log({
      fullName,
      username,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card spacing">
      <Heading>Add Student</Heading>
      <div className="field-wrap">
        <label htmlFor="full-name">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="full-name"
          type="text"
          className="form-field"
          required
        />
      </div>

      <div className="field-wrap">
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
