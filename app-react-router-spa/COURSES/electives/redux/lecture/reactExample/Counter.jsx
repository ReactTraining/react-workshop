import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from './state/counterState'

function Counter({ dispatch }) {
  function decrement() {
    dispatch(actions.decrement())
  }
  function increment() {
    dispatch(actions.increment())
  }

  return (
    <div className="space-x-3">
      <button className="button" onClick={decrement}>
        Decrement
      </button>
      <button className="button" onClick={increment}>
        Increment
      </button>
    </div>
  )
}

// React-Redux 9.3 marks connect as @deprecated. The strikethrough is visual
// only, same as createStore. It still works. Prefer useSelector and useDispatch.
export default connect()(Counter)
