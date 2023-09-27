import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom/client'
import { saveClapsToDatabase } from './utils'

export function ClapButton() {
  const [claps, setClaps] = useState(0)
  const [queueClaps, setQueueClaps] = useState(0)

  useEffect(() => {
    if (queueClaps > 0) {
      const id = setTimeout(() => {
        saveClapsToDatabase(queueClaps).then((latestClaps) => {
          setClaps(latestClaps)
          setQueueClaps(0)
        })
      }, 1000)
      return () => clearTimeout(id)
    }
  }, [queueClaps])

  function clap() {
    setQueueClaps(queueClaps + 1)
  }

  return (
    <div className="space-y-6">
      <button onClick={clap} className="button">
        Clap
      </button>
      <hr />
      <div className="space-x-6">
        <span>Queue Claps: {queueClaps}</span>
        <span>Claps: {claps}</span>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<ClapButton />)
