import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import { authReducer } from './AuthState.final'
import { cartReducer } from './ShoppingCartState.final'

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

function useAppDispatch() {
  return useDispatch<AppDispatch>()
}

function useAppSelector<Selected>(
  selector: (state: AppState) => Selected,
  equalityFn?: (left: Selected, right: Selected) => boolean
) {
  return useSelector(selector, equalityFn)
}

type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { AppDispatch as RootDispatch, AppState as RootState }
export { store, useAppDispatch as useDispatch, useAppSelector as useSelector }

export default store
