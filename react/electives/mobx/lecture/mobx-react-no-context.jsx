import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { makeAutoObservable } from 'mobx'
import { LessonBody, LessonCard } from '~/Lesson'
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
  return (
    <LessonBody>
      <LessonCard>
        <Layout />
      </LessonCard>
    </LessonBody>
  )
}

function Layout() {
  return (
    <div className="space-y-3">
      <Counter />
      <Report />
    </div>
  )
}

// File 1: import store

function Counter() {
  return (
    <div className="space-x-3">
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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
