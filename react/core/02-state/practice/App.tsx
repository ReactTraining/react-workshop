import { useState } from 'react'
import { Heading } from '~/Heading'
// import { LoginForm } from './LoginForm.final'
import { LoginForm } from './LoginForm'
import { LessonBody, LessonCard } from '~/Lesson'

export type User = { userId: number }

export function App() {
  return (
    <LessonBody>
      <div className="flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Heading>Login</Heading>
            <LoginForm />
          </LessonCard>
        </div>
        <div className="lg:flex-1">
          <LessonCard>
            <div>User ID: </div>
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}
