import { LessonBody, LessonCard } from '@/components/Lesson'
import { LoginForm } from './LoginForm-1'
// import { LoginForm } from './LoginForm-2'
// import { LoginForm } from './LoginForm-3'

export default function Page() {
  return (
    <LessonBody>
      <LessonCard>
        <LoginForm />
      </LessonCard>
    </LessonBody>
  )
}
