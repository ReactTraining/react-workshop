import * as React from 'react'
import Heading from 'YesterTech/Heading'
import { useAuthState } from 'YesterTech/AuthState'

function Account() {
  const { user } = useAuthState()
  return (
    <div className="spacing">
      <Heading>My Account</Heading>
      <div>
        Welcome to your account management page, {user.name}. You can only see this page if logged
        in.
      </div>
    </div>
  )
}

export default Account
