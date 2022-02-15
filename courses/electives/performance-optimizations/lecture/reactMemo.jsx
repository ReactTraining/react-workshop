import { useState, Component } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  // const onUpdate = () => {
  //   console.log('User was updated')
  // }

  return (
    <div className="text-center spacing">
      <h3>Owner (Parent) Component</h3>
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <UserProfile
        userId={5}
        // onUpdate={onUpdate}
      />
    </div>
  )
}

class UserProfile extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return true
  // }

  render() {
    console.log('Render')

    return (
      <div>
        <h3>Child Component</h3>
        <p className="text-small">
          Check the console to see how many times I render when the owner state changes
        </p>
      </div>
    )
  }
}
