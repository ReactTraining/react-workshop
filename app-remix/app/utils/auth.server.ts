import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { createUser, getUser, getUserPasswordHash } from './db.server'
import bcrypt from 'bcryptjs'

/****************************************
  Register / Login
*****************************************/

export async function registerUser(username: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10)
  const userId = await createUser(username, passwordHash)
  return userId
}

export async function verifyUser(username: string, password: string) {
  const user = await getUserPasswordHash(username)
  if (!user) return null

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isCorrectPassword) return null

  return user.id
}

/****************************************
  Sessions
*****************************************/

const sessionSecret = 'superdupersecretdefault'

const storage = createCookieSessionStorage({
  cookie: {
    name: 'react_training_remix_auth',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

function getSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
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

export async function getSessionUser(request: Request) {
  const session = await getSession(request)
  const userId = session.get('userId') as string | undefined
  if (!userId || typeof userId !== 'number') {
    return undefined
  }
  return await getUser(parseInt(userId))
}

export async function requireSessionUser(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getSession(request)
  const userId = session.get('userId') as string | undefined
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return await getUser(parseInt(userId))
}

export async function logout(request: Request) {
  const session = await getSession(request)
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}
