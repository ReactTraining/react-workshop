import * as React from 'react'
import * as ReactDOM from "react-dom"
import './styles.scss'

export default function App() {
  const [active, setActive] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(() => {
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

///

// function useReducer<R extends (prevState: S, action: A) => S, S, A>(
//     fn: R,
//     initialState: S
//   ): [S, (action: A) => void];

// function useState<S>(
//     initialState: S
//   ): [S, (newState: S | ((oldState: S) => S)) => void];

// type EffectCallback = () => void | (() => void | undefined);
// function useEffect(fn: EffectCallback, depArray?: any[]): void;

function reRender() {
  ReactDOM.render(<App />, document.getElementById('root'))
}
reRender()
