import { useState } from 'react'
import { Heading } from 'react2/_full-app/src/Heading'
import * as ReactDOM from 'react-dom/client'
import { Tiles } from 'react2/_full-app/src/Tiles'
import { BackgroundPicker } from './BackgroundPicker'
// import { LoginForm } from './LoginForm.final'
import { LoginForm } from './LoginForm'
import './styles.scss'

type User = {
  userId: number
  name: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [colors, setColors] = useState(['#7989C8', '#60D7E6'])

  return (
    <div className="app" style={{ background: `linear-gradient(${colors[0]}, ${colors[1]})` }}>
      <Tiles minSize={25}>
        <div className="card box-shadow">
          <LoginForm onSuccess={setUser} />
        </div>
        <div className="card box-shadow spacing">
          {!user ? <Heading>Not Logged In</Heading> : <Heading>Welcome {user.name}</Heading>}
          <hr />
          <p>Pick a background color:</p>
          <BackgroundPicker colors={colors} setColors={setColors} />
        </div>
      </Tiles>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
