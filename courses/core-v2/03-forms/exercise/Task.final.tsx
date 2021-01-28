import React, { useState, useRef } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'

type Task = {
  name: string
  content: string
  minutes: number
  completedMinutes: number
}

export const Task = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [completedMinutes, setCompletedMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const complete = minutes > 0 && minutes === completedMinutes

  const nameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const task: Task = {
      name,
      content,
      minutes,
      completedMinutes,
    }
    setName('')
    setContent('')
    setMinutes(0)
    setCompletedMinutes(0)
    console.log(task)
    nameRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-1 spacing">
          <input
            className="form-field"
            type="text"
            placeholder="Task Name"
            required
            ref={nameRef}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
          <textarea
            className="form-field"
            placeholder="Task"
            required
            value={content}
            onChange={(event) => {
              setContent(event.target.value)
            }}
          />
        </div>
        <div className="spacing w-40 ml-4">
          <div className="spacing-small">
            <Heading as="h2" size={4}>
              Total Task Minutes:
            </Heading>
            <Minutes minutes={minutes} min={completedMinutes} onChange={setMinutes} />
          </div>

          <div className="spacing-small">
            <Heading as="h2" size={4}>
              Minutes Completed: {completedMinutes}/{minutes}
            </Heading>
            <Progress
              completedMinutes={completedMinutes}
              totalMinutes={minutes}
              onChange={setCompletedMinutes}
              status={complete ? 'complete' : 'progress'}
            />
          </div>
        </div>
      </div>
      <footer className="mt-4">
        <button className="button" type="submit">
          Submit
        </button>
      </footer>
    </form>
  )
}
