import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ as: El = 'h1', size = 1, children, ...props }) {
  return (
    <El {...props} className={`heading heading-size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Heading as="h2" className="foo">
              <Icon name="star" />
              My Label
            </Heading>
          </LessonCard>
        </div>
        <div className="lg:flex-1">
          <LessonCard>Second</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
