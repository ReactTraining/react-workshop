import * as React from 'react'
import * as storage from 'YesterTech/localStorage'
import { getInt } from 'YesterTech/utils'
import type { CartProduct } from 'YesterTech/types'

const ShoppingCartContext = React.createContext<ShoppingCartContextValue>({
  cart: [],
  addToCart() {},
  updateQuantity() {},
  removeFromCart() {},
  getQuantity() {
    return 0
  },
  getCartSize() {
    return 0
  },
  getCartTotal() {
    return 0
  },
})

function shoppingCartReducer(
  state: ShoppingCartState,
  action: ShoppingCartActions
): ShoppingCartState {
  switch (action.type) {
    case 'ADD': {
      const found = state.cart.find((product) => product.productId === getInt(action.productId, 10))
      if (!found) {
        return {
          cart: state.cart.concat({
            productId: getInt(action.productId, 10),
            quantity: 1,
            name: action.name || '',
            price: action.price || 0,
          }),
        }
      } else {
        return state
      }
    }
    case 'UPDATE': {
      let cart
      if (action.quantity > 0) {
        cart = state.cart.map((product) => {
          return product.productId === getInt(action.productId, 10)
            ? { ...product, quantity: getInt(action.quantity, 10) }
            : product
        })
      } else {
        cart = state.cart.filter((product) => product.productId !== getInt(action.productId, 10))
      }
      return { cart }
    }
    case 'REMOVE': {
      if (!state.cart.find((product) => product.productId === action.productId)) {
        return state
      }
      const index = state.cart.findIndex((product) => product.productId === action.productId)
      return {
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
      }
    }
    default:
      return state
  }
}

const initialState = {
  cart: storage.getCart() || [],
}

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(shoppingCartReducer, initialState)

  const context: ShoppingCartContextValue = {
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
      if (!Array.isArray(state.cart)) {
        return 0
      }
      return (state.cart.filter((p) => p.productId === productId)[0] || {}).quantity || 0
    },
    getCartSize() {
      if (!Array.isArray(state.cart)) {
        return 0
      }
      return state.cart.reduce((size, item) => size + item.quantity, 0)
    },
    getCartTotal() {
      if (!Array.isArray(state.cart)) {
        return 0
      }
      return state.cart.reduce((total, item) => total + item.quantity * item.price, 0)
    },
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

type ShoppingCartActions =
  | {
      type: 'ADD'
      productId: CartProduct['productId']
      name: CartProduct['name']
      price: CartProduct['price']
    }
  | {
      type: 'UPDATE'
      quantity: CartProduct['quantity']
      productId: CartProduct['productId']
    }
  | {
      type: 'REMOVE'
      productId: CartProduct['productId']
    }

interface ShoppingCartState {
  cart: CartProduct[]
}

interface ShoppingCartContextValue {
  addToCart(productId: number, name: string, price: number): void
  updateQuantity(productId: number, quantity: number): void
  removeFromCart(productId: number): void
  getQuantity(productId: number): number
  getCartSize(): number
  getCartTotal(): number
  cart: CartProduct[]
}
