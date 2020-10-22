import React from 'react'

type Name = string

const name: Name = 'brad'
console.log(name)

const App: React.FC<{ message: string }> = ({ message }) => {
  return <div>{message}</div>
}

// function App() {
//   return <div>yo</div>
// }

export default App
