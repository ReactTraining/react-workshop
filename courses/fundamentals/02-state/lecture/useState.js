// For Reference

const states = []
let calls = -1

function useState(value) {
  const call = ++calls

  if (states[call]) {
    return states[call]
  }

  function setState(newValue) {
    states[call][0] = newValue
    reRender()
  }

  const state = [value, setState]
  states[call] = state
  return state
}

function reRender() {
  calls = -1
  ReactDOM.render(<Quantity />, document.getElementById('root'))
}
