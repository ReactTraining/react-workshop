import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

/**
 * Context is a little weird in TypeScript so we'll teach it with
 * vanilla JS first. https://reacttraining.com/blog/react-context-with-typescript/
 */

//////// App.tsx

function App() {
  const [count, setCount] = useState(0)
  return <AppLayout count={count} setCount={setCount} />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

//////// AppLayout.tsx

function AppLayout({ count, setCount }) {
  return <Page count={count} setCount={setCount} />
}

//////// Page.tsx

function Page({ count, setCount }) {
  return <Counter count={count} setCount={setCount} />
}

//////// Counter.tsx

function Counter({ count, setCount }) {
  return (
    <div className="card spacing">
      <h1>Counter</h1>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </div>
  )
}
