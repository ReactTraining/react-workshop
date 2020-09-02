import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

const states = []
let calls = -1

function useReducer(fn, initialState) {
  const callId = ++calls

  if (states[callId]) {
    return states[callId]
  }

  function dispatch(action) {
    states[callId][0] = fn(states[callId][0], action)
    reRender()
  }

  states[callId] = [initialState, dispatch]
  return states[callId]
}

function useState(initialState) {
  return useReducer((oldState, newState) => {
    return typeof newState === 'function'
      ? newState(oldState)
      : newState
  }, initialState)
}

const effects = []
let effectCalls = -1

function useEffect(fn, depArray) {
  window.requestAnimationFrame(() => {
    const callId = ++effectCalls

    const depArrayChanged = depArray.reduce(
      (changed, next, index) => {
        if (changed) return changed
        if (!effects[callId] || !Array.isArray(depArray)) return true
        return next !== effects[callId][1][index]
      },
      false
    )

    // Cleanup
    if (depArrayChanged && effects[callId] && effects[callId][2]) {
      effects[callId][2]()
    }

    // The Effect "belongs" to a render
    if (depArrayChanged) {
      effects[callId] = [fn, depArray]
      effects[callId][2] = fn()
    }
  })
}

export default function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (active) {
      const id = setInterval(() => {
        setSeconds(seconds => {
          return seconds + 1
        })
      }, 1000)
      return () => clearInterval(id)
    }
  }, [active])

  return (
    <div className="align-center spacing phony-hooks">
      <div className="horizontal-spacing">
        <button className="button" onClick={() => setActive(true)}>
          Start
        </button>
        <button className="button" onClick={() => setActive(false)}>
          Stop
        </button>
      </div>
      <hr />
      <div>Seconds: {seconds}</div>
    </div>
  )
}

reRender()
function reRender() {
  calls = -1
  effectCalls = -1
  ReactDOM.render(<App />, document.getElementById('root'))
}
