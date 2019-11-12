import React, { useContext, useReducer } from 'react'

const ShoppingCartContext = React.createContext()

const initialState = {
  cart: [],
}

const LOCAL_STORAGE_KEY = 'reacttraining-workshop-shopping-cart'

export function ShoppingCartStateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD': {
        const found = state.cart.find(p => p.productId === action.productId)
        if (!found) {
          return {
            ...state,
            cart: state.cart.concat({
              productId: action.productId,
              quantity: action.quantity,
            }),
          }
        } else {
          // Update existing cart item with new quantity
          const c = state.cart
          const index = c.findIndex(p => p.productId === action.productId)
          const updatedProduct =
            action.quantity > 0 ? Object.assign({}, c[index], { quantity: action.quantity }) : false
          const updatedCart = [...c.slice(0, index), updatedProduct, ...c.slice(index + 1)].filter(
            Boolean
          )
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
  }, initialState)

  const value = {
    ...state,
    addToCart(productId, quantity) {
      dispatch({ type: 'ADD', productId, quantity })
      // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username, name, avatarUrl }))
    },
    removeFromCart(productId) {
      dispatch({ type: 'REMOVE', productId })
      // localStorage.setItem(LOCAL_STORAGE_KEY, null)
    },
    getQuantity(productId) {
      return (state.cart.filter(p => p.productId === productId)[0] || {}).quantity || 0
    },
  }

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCartState() {
  return useContext(ShoppingCartContext)
}
