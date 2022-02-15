import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { saveClapsToDatabase } from './utils'

function ClapButton(): React.ReactElement {
  const [claps, setClaps] = React.useState(0)
  const [queueClaps, setQueueClaps] = React.useState(0)

  React.useEffect(() => {
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
    <div className="text-center spacing debounce">
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

ReactDOM.render(<ClapButton />, document.getElementById('root'))

// One of our instructors wrote a blog article on this exact topic of "debouncing claps":
// https://reacttraining.com/blog/blog-claps-and-lessons-on-hooks/
