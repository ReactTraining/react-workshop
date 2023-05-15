import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ label, onClick, icon }) {
  return (
    <button onClick={onClick} className="button">
      {icon}
      <span>{label}</span>
    </button>
  )
}

function App() {
  function onClick() {
    console.log('we can click')
  }
  return (
    <div>
      <Button onClick={onClick} label="Remove Course" icon={<FaTrash color="red" />} />
      {/* <Button onClick={onClick} label="Remove Course" icon={FaTrash} /> */}
    </div>
  )
}

// 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
