import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import { getInt } from 'YesterTech/utils'
import * as storage from 'YesterTech/localStorage'
import 'YesterTech/styles/global-styles.scss'

const PrimaryLayoutMemoed = React.memo(PrimaryLayout)

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <ShoppingCartProvider>
          <FavoriteProductProvider>
            <PrimaryLayoutMemoed />
          </FavoriteProductProvider>
        </ShoppingCartProvider>
      </AuthStateProvider>
    </BrowserRouter>
  )
}

// Auth context/state

/** @type {import('./types').AuthState} */
const initialAuthStateContext = {
  authenticated: false,
  user: null,
}

/** @type {React.Context<import('./types').AuthState>} */
const AuthStateContext = React.createContext(initialAuthStateContext)

/** @type {React.Context<import('./types').AuthDispatch>} */
const AuthDispatchContext = React.createContext(function dispatch() {})

/**
 * @param {import('./types').AuthState} state
 * @param {import('./types').AuthActions} action
 * @return {import('./types').AuthState}
 */
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, authenticated: true, user: action.user }
    }
    case 'LOGOUT': {
      return { ...initialAuthStateContext }
    }
    default:
      return state
  }
}

function AuthStateProvider({ children }) {
  let [state, dispatch] = React.useReducer(authReducer, initialAuthStateContext)

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export function useAuthDispatch() {
  return React.useContext(AuthDispatchContext)
}

export function useAuthState() {
  return React.useContext(AuthStateContext)
}

// Shopping cart context/state

/** @type {import('./types').ShoppingCartContextValue} */
const initialShoppingCartContext = {
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
  cart: [],
}

/** @type {React.Context<import('./types').ShoppingCartContextValue>} */
const ShoppingCartContext = React.createContext(initialShoppingCartContext)

/**
 * @param {import('./types').ShoppingCartState} state
 * @param {import('./types').ShoppingCartActions} action
 * @return {import('./types').ShoppingCartState}
 */
function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      let found = state.cart.find((p) => p.productId === getInt(action.productId, 10))
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
      return { ...state, cart }
    }
    case 'REMOVE': {
      let c = state.cart
      let index = c.findIndex((p) => p.productId === action.productId)
      let updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
      return { ...state, cart: updatedCart }
    }
    default:
      return state
  }
}

export const ShoppingCartProvider = ({ children }) => {
  let [state, dispatch] = React.useReducer(shoppingCartReducer, {
    cart: storage.getCart() || [],
  })

  /** @type {import('./types').ShoppingCartContextValue} */
  let value = {
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

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCart() {
  let cartState = React.useContext(ShoppingCartContext)

  React.useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}

// Favorite product context/state

/** @type {React.Context<import('./types').FavoriteProductContextValue>} */
const FavoriteProductContext = React.createContext({
  isFavorite() {
    return false
  },
  addFavorite() {},
  removeFavorite() {},
})

export function FavoriteProductProvider({ children }) {
  let [favorites, setFavorites] = React.useState(() => {
    return storage.getFavorites()
  })

  let firstRenderRef = React.useRef(true)

  React.useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  /** @type {import('./types').FavoriteProductContextValue} */
  let value = {
    isFavorite(productId) {
      return favorites.includes(productId)
    },
    addFavorite(productId) {
      setFavorites((favorites) => favorites.concat(productId))
    },
    removeFavorite(productId) {
      setFavorites((favorites) => favorites.filter((id) => id !== productId))
    },
  }

  return <FavoriteProductContext.Provider value={value} children={children} />
}

export function useFavoriteProduct() {
  return React.useContext(FavoriteProductContext)
}

export default App
