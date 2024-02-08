import { useState } from 'react'
import { Heading } from '~/Heading'
import { ConfirmationCode } from './ConfirmationCode.final'
import { LoginForm } from './LoginForm.final'
// import { ConfirmationCode } from './ConfirmationCode'
// import { LoginForm } from './LoginForm'

type User = { userId: number }

export function App() {
  const [user, setUser] = useState<User | null>(null)

  function onSubmit(user: User) {
    setUser(user)
  }

  // Task 2
  // Conditionally render the ConfirmationCode when the user object is set

  return (
    <div>
      <Heading>Login</Heading>
      {!user ? <LoginForm onSubmit={onSubmit} /> : <ConfirmationCode />}
    </div>
  )
}
