import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { App } from './App.final'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="w-[50rem]">
      <App />
    </LessonCard>
  </LessonBody>
)
