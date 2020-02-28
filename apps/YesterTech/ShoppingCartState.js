import React, { useContext, useReducer, useEffect } from 'react'
import * as storage from 'YesterTech/localStorage'

const ShoppingCartContext = React.createContext()

export function ShoppingCartProvider({ children }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD': {
          const found = state.cart.find(p => p.productId === parseInt(action.productId, 10))
          if (!found) {
            return {
              ...state,
              cart: state.cart.concat({
                productId: parseInt(action.productId, 10),
                quantity: 1,
                name: action.name || '',
                price: action.price || 0
              })
            }
          } else {
            return state
          }
        }
        case 'UPDATE': {
          let cart
          if (action.quantity > 0) {
            cart = state.cart.map(product => {
              return product.productId === parseInt(action.productId, 10)
                ? { ...product, quantity: parseInt(action.quantity, 10) }
                : product
            })
          } else {
            cart = state.cart.filter(
              product => product.productId !== parseInt(action.productId, 10)
            )
          }
          return { ...state, cart }
        }
        case 'REMOVE': {
          const c = state.cart
          const index = c.findIndex(p => p.productId === action.productId)
          const updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
          return { ...state, cart: updatedCart }
        }
        default:
          return state
      }
    },
    {
      cart: storage.getCart() || []
    }
  )

  const value = {
    ...state,
    addToCart(productId, name, price) {
      dispatch({ type: 'ADD', productId, name, price })
    },
    updateQuantity(productId, quantity) {
      dispatch({ type: 'UPDATE', productId, quantity })
    },
    removeFromCart(productId) {
      dispatch({ type: 'REMOVE', productId })
    },
    getQuantity(productId) {
      if (!Array.isArray(state.cart)) return 0
      return (state.cart.filter(p => p.productId === productId)[0] || {}).quantity || 0
    },
    getCartSize() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((size, item) => size + item.quantity, 0)
    },
    getCartTotal() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((total, item) => total + item.quantity * item.price, 0)
    }
  }

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCart() {
  const cartState = useContext(ShoppingCartContext)

  useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}
