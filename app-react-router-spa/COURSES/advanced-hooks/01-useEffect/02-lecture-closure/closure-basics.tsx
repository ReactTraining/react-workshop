import { useState, useRef, useEffect } from 'react'
import { LessonBody, LessonCard } from '~/Lesson'

export function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  function saveToDatabase() {
    setTimeout(() => {
      setMessage(
        `We saved a count of ${count}, but it is stale since the count state may have changed`
      )
    }, 3000)
  }

  return (
    <LessonBody>
      <LessonCard>
        <div className="m-auto space-y-6">
          <div className="space-x-3">
            <button className="button" onClick={() => setCount(count + 1)}>
              Count: {count}
            </button>
            <button className="button" onClick={saveToDatabase}>
              Save Count to Database
            </button>
          </div>

          {message && <p>{message}</p>}
        </div>
      </LessonCard>
    </LessonBody>
  )
}
