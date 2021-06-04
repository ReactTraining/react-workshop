import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.scss'

function App() {
  return (
    <div className="App">
      <Count />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

function Count() {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    // alert with the current count on an interval
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button className="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
    </div>
  )
}
