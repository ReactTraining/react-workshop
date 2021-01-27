import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from './Minutes.final'
import { Progress } from './Progress'

export const Task = () => {
  const [completedMinutes, setCompletedMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const complete = minutes > 0 && minutes === completedMinutes

  return (
    <div className="spacing">
      <div className="spacing-small">
        <Heading as="h2" size={4}>
          Total Task Minutes:
        </Heading>
        <Minutes minutes={minutes} min={completedMinutes} setMinutes={setMinutes} />
      </div>

      <div className="spacing-small">
        <Heading as="h2" size={4}>
          Minutes Completed: {completedMinutes}/{minutes}
        </Heading>
        <Progress
          completedMinutes={completedMinutes}
          totalMinutes={minutes}
          status={complete ? 'complete' : 'progress'}
          onChange={(completedMinutes) => {
            setCompletedMinutes(completedMinutes)
          }}
        />
      </div>

      {minutes > 0 && (
        <div>
          <button
            className={`button ${complete ? 'button-green' : ''}`}
            onClick={() => {
              setCompletedMinutes(minutes)
            }}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  )
}
