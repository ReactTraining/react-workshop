import React, { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log('The count is', count)
    }, 3000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveToDatabase() {
    setTimeout(() => {
      console.log('We saved a count of', count)
    }, 3000)
  }

  return (
    <div className="align-center spacing">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <button className="button" onClick={saveToDatabase}>
        Save Count to Database
      </button>
    </div>
  )
}

export default App
