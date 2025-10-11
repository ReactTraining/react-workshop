import { useState, useRef, useEffect } from 'react'
import { LessonBody, LessonCard } from '~/Lesson'

// App() count: 3 <-- fn was made.  { current: 3 }
// App() count: 4                   { current: 2 }
// App() count: 5                   { current: 3 }

// App() count: 7.   { current: 7 }

export function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const countRef = { current: 1 }

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}, but the latest count is ${countRef.current}`)
      }, 3000)
    }
  }, [saving])

  function saveToDatabase() {
    setSaving(true)
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
