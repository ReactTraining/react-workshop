import * as ReactDOM from 'react-dom/client'
// import { AddStudentForm } from './AddStudentForm.final'
import { AddStudentForm } from './AddStudentForm'
import './styles.scss'

function App() {
  return <AddStudentForm />
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
