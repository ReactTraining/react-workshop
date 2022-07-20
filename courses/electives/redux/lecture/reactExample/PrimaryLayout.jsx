import { connect, useSelector } from 'react-redux'
import Counter from './Counter'

function PrimaryLayout() {
  const count = useSelector((state) => {
    return state.counterState.count
  })

  return (
    <div>
      <h1>Redux Counter</h1>
      <div>Count: {count}</div>
      <Counter />
    </div>
  )
}

export default PrimaryLayout
