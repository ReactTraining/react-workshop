import React from 'react'
import { connect } from 'react-redux'
import Counter from './Counter'

function PrimaryLayout({ count }) {
  return (
    <div>
      <h1>Redux Counter</h1>
      <div>Count: {count}</div>
      <Counter />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    count: state.counterState.count
  }
}

export default connect(mapStateToProps)(PrimaryLayout)
