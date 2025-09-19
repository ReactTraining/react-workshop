import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
// import { FaTrash } from 'react-icons/fa'

function Heading({ children, size = 1, as: El = 'h6', ...props }) {
  return (
    <El {...props} className={`heading heading-size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-4">
        <div>
          <LessonCard>
            <Heading id="my-heading">
              <Icon name="star" />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Second</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
