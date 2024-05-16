import { useState } from 'react'
import { Heading } from '~/Heading'
import { LoginForm } from './LoginForm.final'
import { LessonBody, LessonCard } from '~/Lesson'

export type User = { userId: number }

export function App() {
  const [user, setUser] = useState<User | null>(null)

  function onSubmit(user: User) {
    setUser(user)
  }

  return (
    <LessonBody>
      <div className="flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Heading>Login</Heading>
            <LoginForm onSubmit={onSubmit} />
          </LessonCard>
        </div>
        <div className="lg:flex-1">
          <LessonCard>{user && <div>User ID: {user.userId}</div>}</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}
