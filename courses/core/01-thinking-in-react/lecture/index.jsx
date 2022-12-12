import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ children, onClick, ...rest }) {
  return (
    <button {...rest} onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  const courses = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JS' },
  ]

  function onClick() {
    console.log('logic for removing a course')
  }

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={`${course.id}-${course.a}`}>
            <h1>{course.name}</h1>
            <Button onClick={onClick}>
              <FaTrash />
              <span>Remove Course</span>
            </Button>
          </div>
        )
      })}
    </div>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
