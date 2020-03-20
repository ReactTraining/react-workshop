/**
 * WORK IN PROGRESS
 */

import React, {
  useState,
  useContext,
  useMemo,
  useEffect
} from 'react'
import ReactDOM from 'react-dom'

/**
 * 1. When does React.memo at the top level actually matter?
 * 3. When does useMemo matter for the context value?
 *    - When the Provider re-renders for any reason without changing the context, we wouldn't
 *      want to pass down a new object which would lead to all consumers re-rendering. So
 *      memoizing the
 *
 * I think ryan was saying if you don't useMemo the context, then some React.memo's won't matter
 */

function A() {
  console.log('Child A Renders')
  return <B />
}

function B() {
  console.log('Child B Renders')
  return <Counter />
}

function Counter() {
  console.log('Counter Renders')
  const { count, setCount } = useContext(Context)
  return (
    <button onClick={() => setCount(count + 1)} className="button">
      {count}
    </button>
  )
}

function C() {
  console.log('Child C Renders')
  return null
}

//////

const Context = React.createContext()

function AppStateProvider({ children }) {
  const [count, setCount] = useState(0)

  const [_, forceUpdate] = useState()
  useEffect(() => {
    setTimeout(() => {
      console.log('force update')
      forceUpdate(true)
    }, 5000)
  }, [])

  const context = useMemo(() => ({ count, setCount }), [count])

  return <Context.Provider value={context} children={children} />
}

const App = function() {
  console.log('App Renders')
  return (
    <>
      <A />
      <C />
    </>
  )
}

ReactDOM.render(
  <AppStateProvider>
    <App />
  </AppStateProvider>,
  document.getElementById('root')
)
