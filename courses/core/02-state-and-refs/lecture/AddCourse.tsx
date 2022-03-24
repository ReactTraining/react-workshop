import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

export function AddCourse({ onSubmit }: Props) {
  const courseNameRef = useRef<HTMLInputElement>(null!)

  const [name, setName] = useState('')
  const [lessons, setLessons] = useState(0)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit({ name, lessons })
    setName('')
    setLessons(0)
    courseNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
          id="courseName"
          ref={courseNameRef}
          value={name} // this is making it controlled
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div className="flex-1">
        <input
          value={lessons}
          onChange={(e) => {
            setLessons(parseInt(e.target.value))
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
