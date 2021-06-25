import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrimaryLayout from 'YesterTech/PrimaryLayout'
import { getInt } from 'YesterTech/utils'
import * as storage from 'YesterTech/localStorage'
import 'YesterTech/styles/global-styles.scss'
import type {
  CartProduct,
  AppState,
  AppContextValue,
  AppActions,
  AuthActions,
  AuthDispatch,
  AuthState,
  FavoriteProductContextValue,
  ShoppingCartActions,
  ShoppingCartContextValue,
  ShoppingCartState,
} from './types'

const PrimaryLayoutMemoed = React.memo(PrimaryLayout)

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <PrimaryLayoutMemoed />
      </AppProvider>
    </BrowserRouter>
  )
}

const initialState: AppState = {
  // auth state
  authenticated: false,
  user: null,

  // shopping cart state
  cart: [],

  // favorite products state
  favorites: storage.getFavorites(),
}

const initialContext: AppContextValue = {
  ...initialState,
  dispatch() {},
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
  isFavorite() {
    return false
  },
  addFavorite() {},
  removeFavorite() {},
}

const AppStateContext = React.createContext<AppContextValue>(initialContext)

function AppProvider({ children }) {
  let [state, dispatch] = React.useReducer(reducer, initialState)

  let firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(state.favorites)
    }
    firstRenderRef.current = false
  }, [state.favorites])

  let context: AppContextValue = {
    ...state,
    dispatch,
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
    isFavorite(productId) {
      return state.favorites.includes(productId)
    },
    addFavorite(productId) {
      dispatch({ type: 'SET_FAVORITES', favorites: (favorites) => favorites.concat(productId) })
    },
    removeFavorite(productId) {
      dispatch({
        type: 'SET_FAVORITES',
        favorites: (favorites) => favorites.filter((id) => id !== productId),
      })
    },
  }

  return <AppStateContext.Provider value={context}>{children}</AppStateContext.Provider>
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    // auth actions
    case 'LOGIN': {
      return { ...state, authenticated: true, user: action.user }
    }
    case 'LOGOUT': {
      return { ...initialState }
    }

    // shopping cart actions
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
    case 'REMOVE': {
      let c = state.cart
      let index = c.findIndex((p) => p.productId === action.productId)
      let updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
      return { ...state, cart: updatedCart }
    }

    // favorites actions
    case 'SET_FAVORITES': {
      let { favorites: prevState } = state
      let { favorites: nextState } = action
      return {
        ...state,
        favorites: Array.isArray(nextState) ? nextState : nextState(prevState),
      }
    }

    default:
      return state
  }
}

export function useAppState() {
  return React.useContext(AppStateContext)
}

export default App
