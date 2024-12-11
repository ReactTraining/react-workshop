import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { LoginForm } from './LoginForm'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="w-96">
      <LoginForm />
    </LessonCard>
  </LessonBody>
)
