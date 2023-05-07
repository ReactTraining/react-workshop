import * as React from 'react'
import type { CartItemType } from '~/utils/cart.server'

type ContextType = {
  cart: CartItemType[]
}

type Props = {
  children: React.ReactNode
  cart: CartItemType[]
}

const Context = React.createContext<ContextType>(null!)

export function CartProvider({ children, cart }: Props) {
  const context: ContextType = { cart }
  return <Context.Provider value={context} children={children} />
}

export function useCart() {
  const context = React.useContext(Context)
  if (!context) {
    throw Error('Using useAuth without an AuthProvider')
  }
  return context || {}
}
