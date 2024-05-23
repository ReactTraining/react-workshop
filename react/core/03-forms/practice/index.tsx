import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
// import { LoginForm } from './LoginForm.final'
import { LoginForm } from './LoginForm'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  return (
    <>
      <Heading size={3}>Login</Heading>
      <LoginForm />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard>
      <App />
    </LessonCard>
  </LessonBody>
)
