import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.scss'

const CountContext = React.createContext()

function CountDisplay() {
  // const { count } = React.useContext(CountContext)
  const count = 0
  return <p>Current count: {count}</p>
}

function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount((c) => c + 1)
  return (
    <button className="button" onClick={increment}>
      {count}
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <CountDisplay />
      <Counter />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
