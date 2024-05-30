'use client'

import { login } from '@/utils/login'
import React from 'react'
import { useState, useTransition } from 'react'

// 1. Start with client only code. Note that setPending(true) in an
//    async action will not actually queue re-render until action is
//    done. So we'll need a startTransition

export function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  console.log('Where does this run?') // server and client

  // const [pending, startTransition] = useTransition()

  async function loginAction(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // WONT WORK
    setPending(true)
    setError('')

    try {
      const user = await login(username, password)
      console.log('client', user)
      setPending(false)
      setError('')
    } catch (err) {
      if (typeof err === 'string') {
        setError(err)
      }
    }
  }

  return (
    <form action={loginAction} className="space-y-3 max-w-96">
      {error && <div className="text-red-800">{error}</div>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          type="text"
          className="form-field"
          autoComplete="off"
          placeholder="username: user"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          className="form-field"
          placeholder="password: user"
          required
        />
      </div>
      <button type="submit" className="button" disabled={pending}>
        {!pending ? 'Login' : '...'}
      </button>
    </form>
  )
}
