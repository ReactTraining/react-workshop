import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

import { CartProduct } from 'YesterTech/types'
import { getInt } from 'YesterTech/utils'
import { useSelector, useDispatch } from './store.final'

function getInitialState(): ShoppingCartState {
  return {
    cart: storage.getCart() || [],
  }
}

export function cartReducer(
  state = getInitialState(),
  action: ShoppingCartActions
): ShoppingCartState {
  switch (action.type) {
    case 'cart/ADD': {
      const found = state.cart.find((p) => p.productId === getInt(action.productId, 10))
      if (!found) {
        return {
          ...state,
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
    case 'cart/UPDATE': {
      let cart: CartProduct[]
      if (action.quantity > 0) {
        cart = state.cart.map((product) => {
          return product.productId === getInt(action.productId, 10)
            ? { ...product, quantity: getInt(action.quantity, 10) }
            : product
        })
      } else {
        cart = state.cart.filter((product) => product.productId !== getInt(action.productId, 10))
      }
      return { ...state, cart }
    }
    case 'cart/REMOVE': {
      const c = state.cart
      const index = c.findIndex((p) => p.productId === action.productId)
      const updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
      return { ...state, cart: updatedCart }
    }
    default:
      return state
  }
}

export function useShoppingCart(): ShoppingCartContextValue {
  let state = useSelector((state) => state.cart)
  let dispatch = useDispatch()

  React.useEffect(() => {
    storage.updateCart(state.cart)
  }, [state.cart])

  return {
    ...state,
    addToCart(productId, name, price) {
      dispatch({ type: 'cart/ADD', productId, name, price })
    },
    updateQuantity(productId, quantity) {
      dispatch({ type: 'cart/UPDATE', productId, quantity })
    },
    removeFromCart(productId) {
      dispatch({ type: 'cart/REMOVE', productId })
    },
    getQuantity(productId) {
      if (!Array.isArray(state.cart)) return 0
      return (state.cart.filter((p) => p.productId === productId)[0] || {}).quantity || 0
    },
    getCartSize() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((size, item) => size + item.quantity, 0)
    },
    getCartTotal() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((total, item) => total + item.quantity * item.price, 0)
    },
  }
}

type ShoppingCartActions =
  | {
      type: 'cart/ADD'
      productId: number
      name: string
      price: number
    }
  | {
      type: 'cart/UPDATE'
      quantity: number
      productId: number
    }
  | {
      type: 'cart/REMOVE'
      productId: number
    }

export interface ShoppingCartState {
  cart: CartProduct[]
}

interface ShoppingCartContextValue {
  addToCart(
    productId: CartProduct['productId'],
    name: CartProduct['name'],
    price: CartProduct['price']
  ): void
  updateQuantity(productId: CartProduct['productId'], quantity: CartProduct['quantity']): void
  removeFromCart(productId: CartProduct['productId']): void
  getQuantity(productId: CartProduct['productId']): number
  getCartSize(): number
  getCartTotal(): number
  cart: CartProduct[]
}
