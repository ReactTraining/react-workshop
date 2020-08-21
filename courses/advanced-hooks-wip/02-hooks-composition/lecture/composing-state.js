import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect
} from 'react'

// function useLocalStorage(name) {
//   const [value, setValue] = useState(() => {
//     return localStorage.getItem(name)
//   })

//   useEffect(() => {
//     localStorage.setItem(name, value)
//   }, [name, value])

//   return [value, setValue]
// }

// function useUndoState(defaultValue) {
//   const [value, setValue] = useState(defaultValue)
//   const historyRef = useRef([])

//   function undo() {
//     const lastValue = historyRef.current.pop()
//     setValue(lastValue)
//   }

//   function changeValue(newValue) {
//     historyRef.current.push(value)
//     setValue(newValue)
//   }

//   return [value, changeValue, undo]
// }

function useLocalStorage(name, state) {
  const [value, setValue] = state

  useLayoutEffect(() => {
    setValue(localStorage.getItem(name))
  }, [name, setValue])

  useEffect(() => {
    localStorage.setItem(name, value)
  }, [name, value])

  return [value, setValue]
}

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
  const [color, setColor, undo] = useUndoState(
    useLocalStorage('color', useState())
  )
  // const [color, setColor, undo] = useUndoState('#ff0000')

  function changeColor(e) {
    // console.log('here')
    setColor(e.target.value)
  }

  return (
    <div className="composing-state spacing">
      <div
        className="color-preview"
        style={{
          padding: '1rem',
          backgroundColor: color
        }}
      >
        <input
          type="color"
          value={color || ''}
          onChange={changeColor}
          aria-label="Color Picker"
        />
      </div>
      <button className="button" onClick={undo}>
        Undo
      </button>
    </div>
  )
}

export default App
