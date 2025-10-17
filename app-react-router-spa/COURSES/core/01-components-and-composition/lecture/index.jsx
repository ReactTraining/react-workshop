import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'

function Heading({ children, size = 1, as: El = 'h1', ...props }) {
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
            <Heading>
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
