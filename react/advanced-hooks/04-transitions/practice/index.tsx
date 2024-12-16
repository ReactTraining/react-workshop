import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { App } from './App.final'
// import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="flex-1">
      <App />
    </LessonCard>
  </LessonBody>
)
