import { useState, useRef, useEffect } from 'react'
import './styles.scss'

export function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const x = useRef()

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}, but the latest state is ${x.current}`)
      }, 3000)
    }
  }, [saving])

  function saveToDatabase() {
    setSaving(true)
  }

  return (
    <div className="text-center spacing closure-basics">
      <button
        className="button"
        onClick={() => {
          setCount(count + 1)
          x.current = count + 1
        }}
      >
        Count: {count}
      </button>
      <hr />
      <button className="button" onClick={saveToDatabase}>
        Save Count to Database
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
