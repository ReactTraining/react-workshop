import * as React from 'react'
import { render } from 'react-dom'

// type Props = {
//   message: string
// }

interface Props {
  message: string
}

// const App = ({ message }: Props) => {
//   return <div>{message}</div>
// }

function App({ message }: Props) {
  return <div>test</div>
}

render(<App message={123} />, document.getElementById('root'))
