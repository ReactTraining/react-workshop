import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'

// 1. Transitions for rendering performance
import { App } from './rendering-performance'

// 2. Optimistic Forms
// import { App } from './optimistic-forms'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard>
      <App />
    </LessonCard>
  </LessonBody>
)
