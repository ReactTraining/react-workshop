import * as React from 'react'
import { useUndoState } from './utils'

// 1. Make our own useUndoState:
//    [color, setColor, undo] = useUndoState(color)
// 2. Make our own useLocalStorage:
//    [value, setValue] = useLocalStorage(name)
// 3. Refactor them so they can be composed

function App() {
  const [color, setColor, undo] = useUndoState('#ff0000')

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
