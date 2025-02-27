import bcrypt from 'bcryptjs'
import { createCookieSessionStorage, redirect } from 'react-router'
import { getUserPasswordHash } from '~/utils/db.server'

export const storage = createCookieSessionStorage({
  cookie: {
    name: 'react_training_auth',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: ['super_secret'],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function verifyUser(username: string, password: string) {
  const user = await getUserPasswordHash(username)
  if (!user) return null

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isCorrectPassword) return null

  return user.id
}

export async function createUserSession(userId: number, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}
