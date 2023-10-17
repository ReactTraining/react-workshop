import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'

// 1. Formik Intro
// import { App } from './formik-intro'

// 2. Field Wrap
import { App } from './field-wrap'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="w-96">
      <App />
    </LessonCard>
  </LessonBody>
)
