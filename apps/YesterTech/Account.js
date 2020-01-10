import React from 'react'
import Heading from 'YesterTech/Heading'
import { useAuthState } from 'YesterTech/AuthState'

function Account() {
  const { user } = useAuthState()
  return (
    <div className="spacing">
      <Heading>My Account</Heading>
      <div>
        Welcome to your account management page, {user.name}. Unfortunately, we have not finished it
        yet 😟
      </div>
    </div>
  )
}

export default Account
