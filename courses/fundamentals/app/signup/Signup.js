import React from 'react'
import SignupForm from 'workshop/SignupForm'
import api from '../api'

function Signup() {
  function handleSignup(name, username, password, avatarUrl) {
    api.users.registerUser({ name, username, password, avatarUrl }).then(response => {
      console.log('yep', response)
    })
  }

  return <SignupForm onSubmit={handleSignup} />
}

export default Signup
