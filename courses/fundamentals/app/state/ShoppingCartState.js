import React, { useContext, useReducer, useEffect } from 'react'
import * as storage from '../utils/localStorage'

const ShoppingCartContext = React.createContext()

export function ShoppingCartStateProvider({ children }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD': {
          const found = state.cart.find(p => p.productId === action.productId)
          if (!found) {
            return {
              ...state,
              cart: state.cart.concat({
                productId: action.productId,
                quantity: action.quantity,
                name: action.name || '',
                price: action.price || 0,
              }),
            }
          } else {
            // Update existing cart item with new quantity
            const c = state.cart
            const index = c.findIndex(p => p.productId === action.productId)
            const updatedProduct =
              action.quantity > 0
                ? Object.assign({}, c[index], { quantity: action.quantity })
                : false
            const updatedCart = [
              ...c.slice(0, index),
              updatedProduct,
              ...c.slice(index + 1),
            ].filter(Boolean)
            return { ...state, cart: updatedCart }
          }
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
      cart: storage.getCart() || [],
    }
  )

  const value = {
    ...state,
    addToCart(productId, quantity, name, price) {
      dispatch({ type: 'ADD', productId, quantity, name, price })
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
      let size = 0
      state.cart.forEach(item => {
        size += item.quantity
      })
      return size
    },
  }

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCartState() {
  const cartState = useContext(ShoppingCartContext)

  useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}
