import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
import { Notice } from '~/Notice'
import { LoginForm } from './LoginForm'
import { GoogleMaps } from './GoogleMaps'

type User = { userId: number; lat: number; lng: number }

function App() {
  const [user, setUser] = useState<User | null>(null)

  function onSubmit(user: User) {
    setUser(user)
  }

  return (
    <LessonBody>
      <div className="flex gap-12">
        <div className="flex-1">
          <LessonCard>
            <Heading>Login</Heading>
            <LoginForm onSubmit={onSubmit} />
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>
            {!user ? (
              <Notice>Login to see a map</Notice>
            ) : (
              <GoogleMaps pos={{ lat: user.lat, lng: user.lng }} />
            )}
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
