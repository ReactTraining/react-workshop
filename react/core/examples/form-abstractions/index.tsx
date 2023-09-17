import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
import { SignupReactHookForm } from './SignupReactHookForm'

function App() {
  return (
    <LessonBody>
      <div className="flex gap-12">
        <div className="flex-1">
          <LessonCard>
            <Heading>Signup: React Hook Form</Heading>
            <SignupReactHookForm />
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>
            <Heading>Signup: Formik</Heading>
            ...
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
