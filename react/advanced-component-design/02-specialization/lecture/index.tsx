import * as ReactDOM from 'react-dom/client'
import { App } from './App'
import { LessonBody, LessonCard } from '~/Lesson'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="w-96">
      <App />
    </LessonCard>
  </LessonBody>
)
