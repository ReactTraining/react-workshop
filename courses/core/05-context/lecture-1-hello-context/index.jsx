import React, { useState, useContext, useMemo } from 'react'
import * as ReactDOM from 'react-dom/client'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */

/////// CounterContext.tsx

const Context = React.createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const context = useMemo(() => {
    return {
      count,
      setCount,
    }
  }, [count])

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useCounterContext() {
  const context = useContext(Context)
  if (!context) {
    throw Error('You didnt wrap useCounterContext in a provider')
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
