import * as React from 'react'
import * as storage from 'YesterTech/localStorage'
import { getInt } from 'YesterTech/utils'
// 👀
// import type { CartProduct } from 'YesterTech/types'

const ShoppingCartContext = React.createContext()

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = React.useState(() => storage.getCart() || [])

  function addToCart(productId, name, price) {
    setCart((cart) => {
      const found = cart.find((p) => p.productId === getInt(productId, 10))
      if (!found) {
        return cart.concat({
          productId: getInt(productId, 10),
          quantity: 1,
          name: name || '',
          price: price || 0,
        })
      } else {
        return cart
      }
    })
  }

  function updateQuantity(productId, quantity) {
    setCart((cart) => {
      let updatedCart = cart
      if (quantity > 0) {
        updatedCart = cart.map((product) => {
          return product.productId === getInt(productId, 10)
            ? { ...product, quantity: getInt(quantity, 10) }
            : product
        })
      } else {
        updatedCart = cart.filter((product) => product.productId !== getInt(productId, 10))
      }
      return updatedCart
    })
  }

  function removeFromCart(productId) {
    setCart((cart) => {
      if (!cart.find((item) => item.productId === productId)) {
        return cart
      }
      const index = cart.findIndex((p) => p.productId === productId)
      return [...cart.slice(0, index), ...cart.slice(index + 1)]
    })
  }

  function getQuantity(productId) {
    if (!Array.isArray(cart)) {
      return 0
    }
    return (cart.filter((item) => item.productId === productId)[0] || {}).quantity || 0
  }

  function getCartSize() {
    if (!Array.isArray(cart)) {
      return 0
    }
    return cart.reduce((size, item) => size + item.quantity, 0)
  }

  function getCartTotal() {
    if (!Array.isArray(cart)) {
      return 0
    }
    return cart.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const context = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getQuantity,
    getCartSize,
    getCartTotal,
  }

  return <ShoppingCartContext.Provider value={context} children={children} />
}

export function useShoppingCart() {
  const cartState = React.useContext(ShoppingCartContext)

  React.useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}

// 👀
// interface ShoppingCartContextValue {
//   addToCart(productId: number, name: string, price: number): void
//   updateQuantity(productId: number, quantity: number): void
//   removeFromCart(productId: number): void
//   getQuantity(productId: number): number
//   getCartSize(): number
//   getCartTotal(): number
//   cart: CartProduct[]
// }
