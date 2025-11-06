import { useState, useRef, useEffect } from 'react'
import { LessonBody, LessonCard } from '~/Lesson'

/* 
state = [
  [0, fn],
  [0, fn],
]
refs = [
  { current: 7 }
]
*/

// App() count: 3, <-- closed over the state of count which is 3
// App() count: 4
// App() count: 5

// App() count: 7 <---

export function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  // Mutable refs
  const countRef = useRef(0)

  function saveToDatabase() {
    setTimeout(() => {
      setMessage(`We saved a count of ${count}, but the latest count is ${countRef.current}`)
    }, 3000)
  }

  return (
    <LessonBody>
      <LessonCard>
        <div className="m-auto space-y-6">
          <div className="space-x-3">
            <button
              className="button"
              onClick={() => {
                setCount(count + 1)
                countRef.current = count + 1
              }}
            >
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
