import React from 'react'

// // type Props = {
// //   message: string
// // }

// interface Props {
//   message: string
// }

const App: React.FC<{ message: string }> = ({ message }) => {
  return <div>{message}</div>
}

export default App
