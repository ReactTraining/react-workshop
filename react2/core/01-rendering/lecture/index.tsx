import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'

function App() {
  return (
    <LessonBody>
      <div>Lesson....</div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
