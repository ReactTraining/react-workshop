import * as ReactDOM from 'react-dom/client'
// import  { Signup } from './Signup.final'
import { Signup } from './Signup'
import './styles.scss'

function App() {
  return <Signup />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
