import * as React from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = React.useState(0)
  const [saving, setSaving] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)

  const countRef = React.useRef<number>()
  countRef.current = count

  React.useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(
          `We saved a count of ${count}, but this might be stale because count is currently ${countRef.current}`
        )
        setSaving(false)
      }, 3000)
    }
    // 👇🏼 showing with and without count reveals some characteristics of useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  function saveToDatabase() {
    setSaving(true)
  }

  return (
    <div className="align-center spacing closure-basics">
      <button className="button" onClick={() => setCount(count + 1)}>
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
