import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

export function AddCourse({ onSubmit }: Props) {
  // const courseNameRef = useRef()

  const [courseName, setCourseName] = useState('')
  const [lessons, setLessons] = useState(0)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit({ name: courseName, lessons })
    setCourseName('')
    setLessons(0)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          value={courseName}
          onChange={(event) => {
            setCourseName(event.target.value)
          }}
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
          // ref={courseNameRef}
        />
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
