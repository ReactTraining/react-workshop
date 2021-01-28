import React, { useState, useRef } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'

// type Task = {
//   name: string
//   content: string
//   minutes: number
//   completedMinutes: number
// }

export const Task = () => {
  const [completedMinutes, setCompletedMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const complete = minutes > 0 && minutes === completedMinutes

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const task = {}
    console.log(task)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-1 spacing">
          <input className="form-field" type="text" placeholder="Task Name" required />
          <textarea className="form-field" placeholder="Task" required />
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
