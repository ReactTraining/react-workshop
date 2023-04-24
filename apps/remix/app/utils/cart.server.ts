import { Session, createCookieSessionStorage, redirect } from '@remix-run/node'
import { getUser } from './db.server'

const sessionSecret = 'superdupersecretdefault'

const storage = createCookieSessionStorage({
  cookie: {
    name: 'react_training_remix_cart',
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

export type CartItemType = {
  productId: number
  quantity: number
}

export async function getCart(request: Request): Promise<CartItemType[]> {
  const session = await storage.getSession(request.headers.get('Cookie'))
  return session.get('cart') || []
}

export async function setCart(request: Request, cart: CartItemType[]): Promise<Session> {
  const session = await storage.getSession(request.headers.get('Cookie'))
  session.set('cart', cart)
  return session
}

export async function addToCart(request: Request, productId: number) {
  const cart = await getCart(request)
  let found = false
  let newCart = cart.map((item) => {
    if (item.productId === productId) {
      found = true
      return { productId, quantity: item.quantity + 1 }
    } else {
      return item
    }
  })

  if (!found) {
    newCart = cart.concat({ productId, quantity: 1 })
  }

  const session = await setCart(request, newCart)

  return new Response('ok', {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export async function removeFromCart(request: Request, productId: number) {
  const cart = await getCart(request)
  const newCart = cart.filter((item) => item.productId !== productId)
  const session = await setCart(request, newCart)

  return new Response('ok', {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}
