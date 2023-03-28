import React, { useState, useContext, useMemo } from 'react'
import * as ReactDOM from 'react-dom/client'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */
// If you're the owner comp, the comps that you own will get a re-render when you state changes

////// CounterContext.tsx

export const CounterContext = React.createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const context = useMemo(() => {
    return {
      count,
      setCount,
    }
  }, [count])

  return <CounterContext.Provider value={context}>{children}</CounterContext.Provider>
}

export function useCounterContext() {
  const context = useContext(CounterContext) // consumer - subscriber to the context
  if (!context) {
    throw Error('....')
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

// only re-render if it's props actually change according to ===
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
