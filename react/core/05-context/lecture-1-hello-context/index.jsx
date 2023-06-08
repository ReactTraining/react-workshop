import React, { useState, useContext } from 'react'
import * as ReactDOM from 'react-dom/client'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */

//////// App.tsx

const CounterContext = React.createContext()

function App() {
  const [count, setCount] = useState(0)

  const context = {
    count,
    setCount,
  }

  return (
    <CounterContext.Provider value={context}>
      <AppLayout />
    </CounterContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

//////// AppLayout.tsx

function AppLayout() {
  return <Page />
}

//////// Page.tsx

function Page() {
  return <Counter />
}

//////// Counter.tsx

function Counter() {
  const { count, setCount } = useContext(CounterContext)

  return (
    <div className="card spacing">
      <h1>Counter</h1>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </div>
  )
}
