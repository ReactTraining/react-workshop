import React, { useState, useContext } from 'react'
import * as ReactDOM from 'react-dom/client'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */

/////// CounterState

export const CounterContext = React.createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const context = React.useMemo(() => {
    return {
      count,
      setCount,
    }
  }, [count])

  return <CounterContext.Provider value={context}>{children}</CounterContext.Provider>
}

export function useCounterContext() {
  const context = useContext(CounterContext)
  if (!context) {
    throw Error('.......')
  }
  return context || {}
}

//////// App.tsx

function App() {
  return (
    <CounterProvider>
      <AppLayout />
    </CounterProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

//////// AppLayout.tsx

const AppLayout = React.memo(() => {
  console.log('render')
  return <Page />
})

//////// Page.tsx

function Page() {
  return <Counter />
}

//////// Counter.tsx

function Counter() {
  const { count, setCount } = useCounterContext()

  return (
    <div className="card spacing">
      <h1>Counter</h1>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </div>
  )
}
