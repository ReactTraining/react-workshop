import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

function useUndoState(state) {
  const [value, setValue] = state
  const historyRef = useRef([])

  function undo() {
    const lastValue = historyRef.current.pop()
    setValue(lastValue)
  }

  function changeValue(newValue) {
    historyRef.current.push(value)
    setValue(newValue)
  }

  return [value, changeValue, undo]
}

function App() {
  const [color, setColor, undo] = useUndoState(useState())

  const colorRef = useRef()
  const backgroundRef = useRef()
  const timeoutRef = useRef()

  console.log(color)

  function changeColor(e) {
    colorRef.current = e.target.value
    backgroundRef.current.style.backgroundColor = e.target.value
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setColor(colorRef.current)
    }, 700)
  }

  return (
    <div className="composing-state spacing">
      <div
        className="color-preview"
        ref={backgroundRef}
        style={{
          padding: '1rem'
        }}
      >
        <input type="color" onChange={changeColor} aria-label="Color Picker" />
      </div>
      <button className="button" onClick={undo}>
        Undo
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
