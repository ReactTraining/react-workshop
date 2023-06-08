import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: { name: string; lessons: number }): void
}

export function AddCourse({ onSubmit }: Props) {
  const courseRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    onSubmit({ name: courseRef.current.value, lessons: 5 })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-gap">
      <div className="flex-1">
        <input
          ref={courseRef}
          type="text"
          className="form-field"
          placeholder="Course Name"
          aria-label="Course Name"
        />
      </div>
      <div className="flex-1">
        <input type="number" className="form-field" placeholder="Lessons" aria-label="Lessons" />
      </div>
      <button className="button" type="submit">
        Add Course
      </button>
    </form>
  )
}
