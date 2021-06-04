import * as React from 'react'

export type AuthActionTypes = 'LOGIN' | 'LOGOUT'

export type AuthState = {
  authenticated: boolean
  user: null | UserNoPassword
}

export type AuthDispatch = React.Dispatch<AuthActions>

export type AuthActions =
  | {
      type: 'LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'LOGOUT'
    }

export type ProductId = number

export type Product = {
  brand: string
  category: string
  condition: string
  description: string
  id: ProductId
  imagePath: string
  inventory: number
  name: string
  price: number
  rating: number
  relatedProducts?: ProductId[]
  year: string
}

export type CartProduct = {
  productId: ProductId
  quantity: number
  name: string
  price: number
}

export type UserId = number

export type User = {
  id: UserId
  username: string
  name: string
  password: string
  avatarUrl: string
}

export type UserNoId = Omit<User, 'id'> & {
  id?: UserId | undefined | null
}

export type UserNoPassword = Omit<User, 'password'>

export type ShoppingCartActions =
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

export type ShoppingCartState = {
  cart: CartProduct[]
}

export interface ShoppingCartContextValue {
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

export interface FavoriteProductContextValue {
  isFavorite(productId: number): boolean
  addFavorite(productId: number): void
  removeFavorite(productId: number): void
}
