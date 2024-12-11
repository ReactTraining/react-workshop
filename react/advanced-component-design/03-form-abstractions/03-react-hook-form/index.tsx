import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'

// Intro
import { LoginForm } from './start-here'

// Basic Validation
// import { LoginForm } from './basic-validation'

// Zod Validation
// import { LoginForm } from './zod-validation'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="w-96">
      <LoginForm />
    </LessonCard>
  </LessonBody>
)
