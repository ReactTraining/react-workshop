/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { useLocalObservable, Observer, observer } from 'mobx-react-lite'

// mobx-react is a repackage of the smaller mobx-react-lite package
// plus a few more things
// https://github.com/mobxjs/mobx-react#choosing-your-version

/**
 * Global Store
 */

const StoreContext = React.createContext()

function StoreProvider({ children }) {
  const store = useLocalObservable(() => {
    return {
      count: 0,
      increment: () => {
        store.count++
      },
      decrement: () => {
        store.count--
      }
    }
  })

  return <StoreContext.Provider value={store} children={children} />
}

/**
 * App Tree
 */

function App() {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  )
}

function Layout() {
  return (
    <div className="spacing-small">
      <Counter />
      <Report />
    </div>
  )
}

function Counter() {
  const store = useContext(StoreContext)

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

function Report() {
  const store = useContext(StoreContext)

  return (
    <Observer>
      {() => {
        return (
          <div>
            Count: {store.count}
            {/* <Other /> */}
          </div>
        )
      }}
    </Observer>
  )
}

// function Other() {
//   console.log('Do I get re-rendered')
//   return <div />
// }

// <Observer> essentially takes a function and can only observe
// the variables used within. Whereas `observer(Comp)` (the HoC)
// can wrap `Report` and be used incase the `store.count` were used
// in the body of `Report` before the JSX

ReactDOM.render(<App />, document.getElementById('root'))
