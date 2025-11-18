import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'

function Heading({ as: El, size = 1, children }) {
  return <El className={`heading heading-size-${size}`}>{children}</El>
}

function App() {
  return (
    <LessonBody>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <LessonCard>
            <Heading as="h3" size={1}>
              <Icon name="star" size={2} />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Second Card</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
