import * as ReactDOM from 'react-dom/client'
// import  { ClapButton } from './ClapButton.final'
import { ClapButton } from './ClapButton'
import './styles.scss'

function App() {
  return <ClapButton />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
