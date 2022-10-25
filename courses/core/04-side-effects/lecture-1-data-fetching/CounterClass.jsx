import React from 'react'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      error: '',
    }
    this.subtract = this.subtract.bind(this)
    this.add = this.subtract.bind(this)
  }

  subtract() {
    const nextCount = this.state.count - 1
    this.setState((state) => {
      return { count: nextCount, error: nextCount < 0 ? 'Cannot be less than' : '' }
    })
  }

  add() {
    this.setState((state) => {
      return { count: state.count + 1 }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.subtract} className="button">
          Subtract
        </button>
        <div>{this.state.count}</div>
        <button onClick={this.add} className="button">
          Add
        </button>
      </div>
    )
  }
}
