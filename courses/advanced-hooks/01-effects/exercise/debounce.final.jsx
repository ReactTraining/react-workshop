import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { saveClapsToDatabase } from './utils'

function ClapButton() {
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

  const clap = () => {
    setQueueClaps(queueClaps + 1)
  }

  return (
    <div className="text-center spacing">
      <button onClick={clap} className="button">
        Clap
      </button>
      <hr />
      <div className="horizontal-spacing">
        <span>Queue Claps: {queueClaps}</span>
        <span>Claps: {claps}</span>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ClapButton />)
