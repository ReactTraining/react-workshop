import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

// Imperative: How
// Declarative: What

export function AddCourse({ onSubmit }: Props) {
  const courseNameRef = useRef<HTMLInputElement>(null!)

  const [courseName, setCourseName] = useState('')
  const [lessons, setLessons] = useState(0)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit({ name: courseName, lessons })

    setCourseName('')
    setLessons(0)

    courseNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          ref={courseNameRef}
          value={courseName}
          onChange={(event) => {
            setCourseName(event.target.value)
          }}
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
        />
        <span>{courseName.length}</span>
      </div>
      <div className="flex-1">
        <input
          value={lessons}
          onChange={(event) => {
            setLessons(parseInt(event.target.value))
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
