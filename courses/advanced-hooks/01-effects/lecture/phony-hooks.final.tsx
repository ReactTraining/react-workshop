import * as React from 'react'
import * as ReactDOM from 'react-dom'
import isFunction from 'lodash.isfunction'
import './styles.scss'

export default function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (active) {
      const id = setInterval(() => {
        setSeconds((seconds) => {
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

const states: any[] = []
let calls = -1

// useReducer

function useReducer<R extends (prevState: S, action: A) => S, S, A>(
  fn: R,
  initialState: S
): [S, (action: A) => void]

function useReducer<R extends (prevState: S, action: A) => S, S, A>(
  fn: R,
  initialState: S
): [S, (action: A) => void] {
  const callId = ++calls

  if (states[callId]) {
    return states[callId]
  }

  function dispatch(action: A): void {
    states[callId][0] = fn(states[callId][0], action)
    reRender()
  }

  states[callId] = [initialState, dispatch]
  return states[callId]
}

// useState

function useState<S>(initialState: S): [S, (newState: S | ((oldState: S) => S)) => void]

function useState<S>(initialState: S): [S, (newState: S | ((oldState: S) => S)) => void] {
  return useReducer((oldState, newState) => {
    return isFunction(newState) ? newState(oldState) : newState
  }, initialState)
}

// useEffect
const effects: any = []
let effectCalls = -1

type EffectCallback = () => void | (() => void | undefined)
function useEffect(fn: EffectCallback, depArray?: any[]): void

function useEffect(fn: EffectCallback, depArray?: any[]): void {
  window.requestAnimationFrame(() => {
    const callId = ++effectCalls

    const depArrayChanged = (depArray || []).reduce((changed, next, index) => {
      if (changed) return changed
      if (!effects[callId] || !Array.isArray(depArray)) return true
      return next !== effects[callId][1][index]
    }, false)

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

reRender()
function reRender(): void {
  calls = -1
  effectCalls = -1
  ReactDOM.render(<App />, document.getElementById('root'))
}
