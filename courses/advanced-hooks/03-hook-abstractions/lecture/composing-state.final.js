import * as React from 'react'

function useLocalStorage(name, state) {
  const [value, setValue] = state
  console.log(value)

  React.useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value))
  }, [name, value])

  return [value, setValue]
}

function useUndoState(state) {
  const [values, setValues] = state

  function undo() {
    setValues(values.slice(0, values.length - 1))
  }

  function changeValue(newValue) {
    setValues(values.concat([newValue]))
  }

  return [values.slice(values.length - 1), changeValue, undo]
}

function App() {
  const [color, setColor, undo] = useUndoState(
    useLocalStorage(
      'color',
      React.useState(() => {
        return JSON.parse(localStorage.getItem('color')) || ['#ff0000']
      })
    )
  )

  function changeColor(e) {
    setColor(e.target.value)
  }

  return (
    <div className="composing-state spacing">
      <div
        className="color-preview"
        style={{
          padding: '1rem',
          backgroundColor: color,
        }}
      >
        <input type="color" value={color || ''} onChange={changeColor} aria-label="Color Picker" />
      </div>
      <button className="button" onClick={undo}>
        Undo
      </button>
    </div>
  )
}

export default App
