import React, { useState, useRef, useEffect } from 'react'

function useLocalStorage(name) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(name)
  })

  useEffect(() => {
    localStorage.setItem(name, value)
  }, [name, value])

  return [value, setValue]
}

function useStateHistory(value) {
  const prevValueRef = useRef([value])

  useEffect(() => {
    prevValueRef.current.push(value)
  }, [value])

  return prevValueRef.current
}

function App() {
  const [color, setColor] = useLocalStorage('color')
  const prevColor = useStateHistory(color)

  console.log(color, prevColor)

  function changeColor(e) {
    // console.log('here')
    setColor(e.target.value)
  }

  return (
    <div className="spacing">
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
      <button className="button">Undo</button>
    </div>
  )
}

export default App
