import ReactDOM from 'react-dom'
// import { AddStudentForm } from './AddStudentForm.final'
import { AddStudentForm } from './AddStudentForm'
import './styles.scss'

function App() {
  return <AddStudentForm />
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
