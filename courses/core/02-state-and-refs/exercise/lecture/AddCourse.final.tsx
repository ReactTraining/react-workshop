import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

export function AddCourse({ onSubmit }: Props) {
  const [name, setName] = useState('')
  const [lessons, setLessons] = useState('')
  const nameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit({ name, lessons: parseInt(lessons) })
    setName('')
    setLessons('')
    nameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          ref={nameRef}
        />
      </div>
      <div className="flex-1">
        <input
          type="number"
          className="form-field"
          placeholder="Lessons"
          aria-label="Lessons"
          value={lessons}
          onChange={(event) => setLessons(event.target.value)}
        />
      </div>
      <button className="button" type="submit">
        Add Course
      </button>
    </form>
  )
}
