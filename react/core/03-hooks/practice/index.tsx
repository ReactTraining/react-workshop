import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
import { Notice } from '~/Notice'
// import { LoginForm } from './LoginForm.final'
import { LoginForm } from './LoginForm.final'
// import { AccountPage } from './AccountPage.final'
import { AccountPage } from './AccountPage'

export type User = { userId: number }

function App() {
  const [user, setUser] = useState<User | null>(null)

  function onSubmit(user: User) {
    setUser(user)
  }

  return (
    <LessonBody>
      <div className="flex gap-12">
        <LessonCard className="flex-1">
          <Heading>Login</Heading>
          <LoginForm onSubmit={onSubmit} />
        </LessonCard>
        <LessonCard className="flex-1">
          {!user ? <Notice>Login to see this page</Notice> : <AccountPage user={user} />}
        </LessonCard>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
