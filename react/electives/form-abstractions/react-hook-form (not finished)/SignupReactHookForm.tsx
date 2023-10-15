import { useState } from 'react'

export function SignupReactHookForm() {
  return (
    <form className="space-y-3">
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="form-field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" className="form-field" />
      </div>
      <button type="submit" className="button">
        Signup
      </button>
    </form>
  )
}
