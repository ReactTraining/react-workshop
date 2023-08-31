import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

export function AddCourse({ onSubmit }: Props) {
  const courseNameRef = useRef() // { current: input }

  const [courseName, setCourseName] = useState('')
  const [lessons, setLessons] = useState(0)

  const [formFields, setFormFields] = useState({})

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    onSubmit({ name: courseName, lessons: lessons })
    setCourseName('')
    setLessons(0)

    // establish focus on the first input
    courseNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          value={courseName}
          onChange={(event) => {
            setCourseName(event.target.value)
          }}
          ref={courseNameRef}
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
        />
      </div>
      <div className="flex-1">
        <input
          value={lessons}
          onChange={(e) => {
            setLessons(e.target.value)
          }}
          type="number"
          className="form-field"
          placeholder="Lessons"
          aria-label="Lessons"
        />
      </div>
      <button className="button" type="submit">
        Add Course
      </button>
    </form>
  )
}
