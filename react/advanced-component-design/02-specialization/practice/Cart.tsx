import { createContext, use, useState } from 'react'

/****************************************
  YOU DON'T NEED TO TOUCH THIS FILE
*****************************************/

type ContextType = {
  cart: number[]
  addToCart(id: number): void
  removeFromCart(id: number): void
}

const Context = createContext<ContextType>(null!)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<number[]>([])

  function addToCart(id: number) {
    if (!cart.includes(id)) {
      setCart(cart.concat(id))
    }
  }

  function removeFromCart(id: number) {
    setCart(cart.filter((cartId) => cartId !== id))
  }

  const context = {
    cart,
    addToCart,
    removeFromCart,
  }

  return <Context value={context}>{children}</Context>
}

export function useCart() {
  const context = use(Context)
  if (!context) {
    console.error('You are trying to consume Cart context without a provider')
  }
  return context || {}
}
