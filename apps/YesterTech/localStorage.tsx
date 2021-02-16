/**
 * Auth
 */

import { CartProduct, UserNoPassword } from 'YesterTech/types'

const LOCAL_STORAGE_KEY_AUTH = 'reacttraining-workshop-auth'

export function login(user: UserNoPassword): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(user))
}

export function logout() {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, null as any)
}

export function getAuthenticatedUser(): UserNoPassword | undefined {
  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)
    return localStorageUser ? JSON.parse(localStorageUser) : undefined
  } catch (e) {
    return
  }
}

/**
 * Cart
 */

const LOCAL_STORAGE_KEY_CART = 'reacttraining-workshop-cart'

export function updateCart(cart: CartProduct[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart))
}

export function getCart() {
  try {
    const cart = localStorage.getItem(LOCAL_STORAGE_KEY_CART)
    if (!cart) return
    return JSON.parse(cart)
  } catch (e) {
    return
  }
}

/**
 * Favorites
 */

const LOCAL_STORAGE_KEY_FAVORITES = 'reacttraining-workshop-favorites'

export function updateFavorites(favorites: number[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(favorites))
}

export function getFavorites(): number[] {
  try {
    const favorites = localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES)
    return favorites ? JSON.parse(favorites) : []
  } catch (e) {
    return []
  }
}
