import React from 'react'
import LoginForm from 'workshop/LoginForm'
import { login } from './utils/auth'
import { useAuthState } from './state/AuthState'

function Home() {
  const { loginUser } = useAuthState()

  function handleLogin(email, password) {
    login(email, password).then(user => {
      loginUser(user)
    })
  }

  return (
    <div>
      Home Page
      <br />
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

export default Home
