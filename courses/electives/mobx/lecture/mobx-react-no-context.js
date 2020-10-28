import React from 'react'
import ReactDOM from 'react-dom'
import { makeAutoObservable } from 'mobx'
import { Observer, observer } from 'mobx-react'

/**
 * Global Store
 */

class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}

// Export this
const store = new Store()

/**
 * App Tree
 */

function App() {
  return <Layout />
}

function Layout() {
  return (
    <div className="spacing-small">
      <Counter />
      <Report />
    </div>
  )
}

// File 1: import store

function Counter() {
  return (
    <div className="horizontal-spacing">
      <button onClick={() => store.decrement()} className="button">
        Decrement
      </button>
      <button onClick={() => store.increment()} className="button">
        Increment
      </button>
    </div>
  )
}

// File 2: import store

function Report() {
  return (
    <Observer>
      {() => (
        <div>
          Count: {store.count}
          {/* <Other /> */}
        </div>
      )}
    </Observer>
  )
}

// function Other() {
//   console.log('Do I get re-rendered')
//   return <div />
// }

ReactDOM.render(<App />, document.getElementById('root'))
