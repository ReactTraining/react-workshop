import * as ReactDOM from 'react-dom/client'
import { FaAngleRight } from 'react-icons/fa'
import { LessonBody } from '~/Lesson'
import { Disclosure } from './Disclosure'
import '../lecture/styles.css'

function App() {
  return (
    <LessonBody>
      {/*
      Create a reusable component in the Disclosure.jsx file. This is just
      giving you the starting DOM structure you're aiming for:
      */}
      <div className="disclosure">
        <button className="disclosure-button">
          <FaAngleRight />
          Click Me
        </button>
        <div className="disclosure-panel">Panel Contents</div>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
