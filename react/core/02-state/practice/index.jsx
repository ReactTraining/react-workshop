import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
// import { App } from './App.final'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LessonBody>
    <LessonCard>
      <App />
    </LessonCard>
  </LessonBody>
)
