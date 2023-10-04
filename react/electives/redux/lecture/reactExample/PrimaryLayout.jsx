import { connect, useSelector } from 'react-redux'
import Counter from './Counter'

function PrimaryLayout() {
  const count = 0

  return (
    <div className="space-y-3">
      <h1>Redux Counter</h1>
      <div>Count: {count}</div>
      <Counter />
    </div>
  )
}

export default PrimaryLayout
